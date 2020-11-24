class ApplicationController < ActionController::Base
  def fallback_index_html
    render file: "client/build/index.html"
  end

  # In our gemfile:
  # gem 'rubyzip'

  require 'zip'

  # private ?
  def process_and_create_zip_file
    # Simulation of an object with has_many_attached :documents
    products = Product.with_attached_image.all
    # Tmp folder to store the download files from S3
    # Notice we prfix the folder with a unique number (current_user.id)
    tmp_user_folder = "tmp/archive_#{rand 10000}"
    # Determin the length of the folder
    # directory_length_same_as_documents = Dir["#{tmp_user_folder}/*"].length == job.documents.length
    # Create a tmp folder if not exists
    FileUtils.mkdir_p(tmp_user_folder) unless Dir.exists?(tmp_user_folder)
    # Download and save documents to our tmp folder
    products.each do |prod|
      filename = prod.image.blob.filename.to_s + ".jpg"
      # User should be able to download files if not yet removed from tmp folder
      # if the folder is already there, we'd get an error
      create_tmp_folder_and_store_documents(prod.image, tmp_user_folder, filename)
      #---------- Convert to .zip --------------------------------------- #
      create_zip_from_tmp_folder(tmp_user_folder, filename)
    end
    # Sends the *.zip file to be download to the client's browser
    send_file(Rails.root.join("#{tmp_user_folder}.zip"), :type => 'application/zip', :filename => "Files_for_products.zip", :disposition => 'attachment')
    # TODO: Remove files at a later date
    # as zip file wont be able to downloads if uncommented
    # FileUtils.rm_rf([tmp_user_folder, "#{tmp_user_folder}.zip"])
  end

  def create_tmp_folder_and_store_documents(document, tmp_user_folder, filename)
    File.open(File.join(tmp_user_folder, filename), 'wb') do |file|
      # As per georgeclaghorn in comment ;)
      document.download { |chunk| file.write(chunk) }
    end
  end

  def create_zip_from_tmp_folder(tmp_user_folder, filename)
    Zip::File.open("#{tmp_user_folder}.zip", Zip::File::CREATE) do |zf|
      zf.add(filename, "#{tmp_user_folder}/#{filename}")
    end
  end
end
