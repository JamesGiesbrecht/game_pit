class PagesController < InheritedResources::Base

  # GET /page.json
  def index
    @pages = Page.all
  end

  # GET /page/1.json
  def show
    @page = Page.find(params[:id])
  end

  private

  def page_params
    params.require(:page).permit(:title, :content, :permalink)
  end
end
