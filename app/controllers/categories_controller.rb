class CategoriesController < ApplicationController
  before_action :set_category, only: %i[update destroy]

  # GET /categories.json
  def index
    @categories = Category.all
  end

  # GET /categories/1.json
  def show
    @category = Category.includes(products: [:image_attachment, product_details: [:detail]]).find(params[:id])
  end

  # POST /categories.json
  def create
    @category = Category.new(category_params)

    respond_to do |format|
      if @category.save
        format.json { render :show, status: :created, location: @category }
      else
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /categories/1.json
  def update
    respond_to do |format|
      if @category.update(category_params)
        format.json { render :show, status: :ok, location: @category }
      else
        format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1.json
  def destroy
    @category.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_category
    @category = Category.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def category_params
    params.fetch(:category, {})
  end
end
