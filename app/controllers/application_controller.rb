class ApplicationController < ActionController::Base
  def fallback_index_html
    render file: "client/build/index.html"
  end
end
