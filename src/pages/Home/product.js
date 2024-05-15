import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";

import { faStar } from '@fortawesome/free-solid-svg-icons';
library.add(faStar);

const ProductSection = () => {
    return (
        <section className="products-section text-center rpt-90 py-100 rpb-65">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-9 col-md-10">
                        <div className="section-title mb-65">
                            <span className="sub-title">popular product</span>
                            <h2>Visit Our Shop to collect beauty products</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="product-item wow fadeInUp delay-0-2s">
                            <div className="image">
                                <a href="/"><img src={require("../../assets/images/products/product-1.jpg")} alt="Product" /></a>
                                <div className="rating">
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                </div>
                            </div>
                            <h5><a href="/">Face Cream Winter</a></h5>
                            <span className="price">Price $253.59</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="product-item wow fadeInUp delay-0-4s">
                            <div className="image">
                                <a href="/"><img src={require("../../assets/images/products/product-2.jpg")} alt="Product" /></a>
                                <div className="rating">
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                </div>
                            </div>
                            <h5><a href="/">Organic Hair Oil</a></h5>
                            <span className="price">Price $253.59</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="product-item wow fadeInUp delay-0-6s">
                            <div className="image">
                                <a href="/"><img src={require("../../assets/images/products/product-3.jpg")} alt="Product" /></a>
                                <div className="rating">
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                </div>
                            </div>
                            <h5><a href="/">Natural Hair Colors</a></h5>
                            <span className="price">Price $253.59</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="product-item wow fadeInUp delay-0-8s">
                            <div className="image">
                                <a href="/"><img src={require("../../assets/images/products/product-4.jpg")} alt="Product" /></a>
                                <div className="rating">
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                    <FontAwesomeIcon icon="fas fa-star" />
                                </div>
                            </div>
                            <h5><a href="/">Summer Face Cream</a></h5>
                            <span className="price">Price $253.59</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductSection;