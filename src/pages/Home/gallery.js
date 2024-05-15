import { useEffect, useState } from "react";
import axiosInstance from "../../configs/axios";

const GallerySection = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const getImages = async () => {
        setLoading(true);
        await axiosInstance.get(`ServiceImage/images`).then((response) => {
            const result = response.data;
            if (result && result.success) {
                setImages(result.data);
            }
            else console.log(result.message);
        }).catch((error) => console.log(error)).finally(() => setTimeout(() => setLoading(false), 600));
    }

    useEffect(() => {
        getImages();
    }, []);

    return (
        <section id="gallery-2" className="pb-100 gallery-section division">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8">
                        <div className="section-title title-01 mb-60">
                            <span className="sub-title">Gallery</span>
                            <h2>Let's take a look at the services</h2>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4">
                    {
                        images && images.length > 0 ?
                            images.map((item, index) => {
                                return (
                                    <div className="col" key={index}>
                                        <div id="img-2-1" className="gallery-image">
                                            <div className="hover-overlay">
                                                <img className="img-fluid" src={item?.imageURL} alt="gallery-image" />
                                                <div className="item-overlay"></div>
                                                {/* <div className="image-description white--color">
                                            <div className="image-caption">
                                                <p className="txt-upcase">Art, Care</p>
                                                <h5 className="h5-lg">Nail Art Design</h5>
                                            </div>
                                        </div> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            null
                    }
                    {/* <div className="col">
                        <div id="img-2-1" className="gallery-image">
                            <div className="hover-overlay">
                                <img className="img-fluid" src="https://shtheme.com/demosd/lanottewp/wp-content/themes/lanotte/assets/images/gallery/700x700_1.jpg" alt="gallery-image" />
                                <div className="item-overlay"></div>
                                <div className="image-description white--color">
                                    <div className="image-caption">
                                        <p className="txt-upcase">Art, Care</p>
                                        <h5 className="h5-lg">Nail Art Design</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div id="img-2-2" className="gallery-image">
                            <div className="hover-overlay">
                                <img className="img-fluid" src="https://shtheme.com/demosd/lanottewp/wp-content/themes/lanotte/assets/images/gallery/700x700_2.jpg" alt="gallery-image" />
                                <div className="item-overlay"></div>
                                <div className="image-description white--color">
                                    <div className="image-caption">
                                        <p className="txt-upcase">Hands, Treatment</p>
                                        <h5 className="h5-lg">Callus Treatment</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div id="img-2-3" className="gallery-image">
                            <div className="hover-overlay">
                                <img className="img-fluid" src="https://shtheme.com/demosd/lanottewp/wp-content/themes/lanotte/assets/images/gallery/700x700_3.jpg" alt="gallery-image" />
                                <div className="item-overlay"></div>
                                <div className="image-description white--color">
                                    <div className="image-caption">
                                        <p className="txt-upcase">Hands, Care</p>
                                        <h5 className="h5-lg">Polish Change</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div id="img-2-4" className="gallery-image">
                            <div className="hover-overlay">
                                <img className="img-fluid" src="https://shtheme.com/demosd/lanottewp/wp-content/themes/lanotte/assets/images/gallery/700x700_4.jpg" alt="gallery-image" />
                                <div className="item-overlay"></div>
                                <div className="image-description white--color">
                                    <div className="image-caption">
                                        <p className="txt-upcase">Hands, Care</p>
                                        <h5 className="h5-lg">Classic Manicure</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div id="img-2-5" className="gallery-image">
                            <div className="hover-overlay">
                                <img className="img-fluid" src="https://shtheme.com/demosd/lanottewp/wp-content/themes/lanotte/assets/images/gallery/700x700_5.jpg" alt="gallery-image" />
                                <div className="item-overlay"></div>
                                <div className="image-description white--color">
                                    <div className="image-caption">
                                        <p className="txt-upcase">Hands, Treatment</p>
                                        <h5 className="h5-lg">Spa Pedicure</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div id="img-2-6" className="gallery-image">
                            <div className="hover-overlay">
                                <img className="img-fluid" src="https://shtheme.com/demosd/lanottewp/wp-content/themes/lanotte/assets/images/gallery/700x700_6.jpg" alt="gallery-image" />
                                <div className="item-overlay"></div>
                                <div className="image-description white--color">
                                    <div className="image-caption">
                                        <p className="txt-upcase">Hands, Treatment</p>
                                        <h5 className="h5-lg">Gel Manicure</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div id="img-2-7" className="gallery-image">
                            <div className="hover-overlay">
                                <img className="img-fluid" src="https://shtheme.com/demosd/lanottewp/wp-content/themes/lanotte/assets/images/gallery/700x700_7.jpg" alt="gallery-image" />
                                <div className="item-overlay"></div>
                                <div className="image-description white--color">
                                    <div className="image-caption">
                                        <p className="txt-upcase">Hands, Treatment</p>
                                        <h5 className="h5-lg">Express Manicure</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div id="img-2-8" className="gallery-image">
                            <div className="hover-overlay">
                                <img className="img-fluid" src="https://shtheme.com/demosd/lanottewp/wp-content/themes/lanotte/assets/images/gallery/700x700_8.jpg" alt="gallery-image" />
                                <div className="item-overlay"></div>
                                <div className="image-description white--color">
                                    <div className="image-caption">
                                        <p className="txt-upcase">Hands, Treatment</p>
                                        <h5 className="h5-lg">Paraffin Manicure</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default GallerySection;