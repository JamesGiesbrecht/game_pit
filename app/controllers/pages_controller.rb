class PagesController < InheritedResources::Base

  # GET /page.json
  def index
    @pages = Page.all
  end

  # GET /page/contact.json
  def show
    @page = Page.find_by permalink: params[:id]
  end

  private

  def page_params
    params.require(:page).permit(:title, :content, :permalink)
  end
end
