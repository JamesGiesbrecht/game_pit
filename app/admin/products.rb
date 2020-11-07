ActiveAdmin.register Product do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :name, :description, :category_id, :price, :stock_quantity, :discount, :image

  form do |f|
    f.semantic_errors # shows errors on :base
    f.inputs # builds an input field for every attribute
    # start custom section
    f.inputs do
      f.input :image, as: :file # adding image file upload
    end
    # end custom section
    f.actions # adds the 'Submit' and 'Cancel' buttons
  end

  show do
    attributes_table do
      row :title
      row :image do |ad|
        image_tag url_for(ad.image) if ad.image.attached?
      end
    end
  end
  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :description, :category_id, :price, :stock_quantity, :discount]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

end
