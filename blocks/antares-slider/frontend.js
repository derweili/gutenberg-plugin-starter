import Slider from 'react-slick'

const { render, Fragment } = wp.element;

const sliders = document.querySelectorAll(
    ".antares-slider"
);

const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 900,
            settings: {
                swipe: true,
                arrows: false,
            }
        }
    ]
};

sliders.forEach((slider, index) => {
    // const slides = slider.children.map(e => e.innerText);

    const slides = [].map.call( slider.children, function(node){
        return node.innerHTML || "";
    })

    // const GallerySlider = (<Slider className="antares-slider" {...sliderSettings}>
    //     {
    //         slides.map(slide => {
    //             <div dangerouslySetInnerHTML={{__html: slide}}>
    //             </div>
    //         })
    //     }
    // </Slider>)
    console.log(slides);
    render(
        <Slider className="antares-slider" {...sliderSettings}>
            {
                slides.map(slide => {
                    return (
                        <div dangerouslySetInnerHTML={{__html: slide}}>
                        </div>
                    )
                })
            }
        </Slider>,
        slider
      );
    
})