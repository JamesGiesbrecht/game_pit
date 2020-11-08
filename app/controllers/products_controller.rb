class ProductsController < ApplicationController
  before_action :set_product, only: %i[show update destroy]

  # GET /products.json
  def index
    @products = Product.includes(:category, product_details: [:detail]).all.with_attached_image
  end

  # GET /products/1.json
  def show; end

  # POST /products.json
  def create
    @product = Product.new(product_params)

    respond_to do |format|
      if @product.save
        format.json { render :show, status: :created, location: @product }
      else
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /products/1.json
  def update
    respond_to do |format|
      if @product.update(product_params)
        format.json { render :show, status: :ok, location: @product }
      else
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1.json
  def destroy
    @product.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def product_params
    params.fetch(:product, {})
  end
end
