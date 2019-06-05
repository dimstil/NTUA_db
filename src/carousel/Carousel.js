import React, { Component } from 'react';
import './carousel.css';
import Pic1 from './librarycarousel.png';
import Pic2 from './lib1.png';
import Pic3 from './ntualibrary.png';

class Carousel extends Component {
	constructor() {
		super();
		this.state = {
            slideIndex : 1,
            slidesDisplay : "none",
            dots : ""
        };
    };
    
     
    
    plusSlides(n) {
        this.setState({
            slideIndex : ((this.state.slideIndex+n)%3 +1)
        } )
    }
    
    currentSlide(n) {
     this.setState({
          slideIndex : n
      } );
    }
    

    render() {
        return(
            <div>
                <div className="slideshow-container">

                    <div className="mySlides fade" style={{
                        display : (this.state.slideIndex===1)?"block":"none"
                    }}>
                        <div className="numbertext">1 / 3</div>
                            <img src={Pic1} style={{width:"100%"}}/>
                        <div className="text">Welcome to the NTUA Library</div>
                    </div>

                    <div className="mySlides fade" style={{
                    display : (this.state.slideIndex===2)?"block":"none"
                    }}>
                        <div className="numbertext">2 / 3</div>
                        <img src={Pic2}  style={{width:"100%"}}/>
                        <div className="text">Explore the Library</div>
                    </div>
                    <div className="mySlides fade"style={{
                    display : (this.state.slideIndex===3)?"block":"none"
                    }}>
                        <div className="numbertext">3 / 3</div>
                        <img src={Pic3}  style={{width:"100%"}}/>

                    </div>

                    <a className="prev" onClick={()=> this.plusSlides(-1)}>&#10094;</a>
                    <a className="next" onClick={()=> this.plusSlides(1)}>&#10095;</a>

                </div>
                <br/>

                <div style={{textAlign:"center"}}>
                    <span className={(this.state.slideIndex===1)?"dot":"dot active"} onClick={()=> this.currentSlide(1)}></span> 
                    <span className={(this.state.slideIndex===2)?"dot":"dot active"} onClick={()=> this.currentSlide(2)}></span> 
                    <span className={(this.state.slideIndex===3)?"dot":"dot active"} onClick={()=> this.currentSlide(3)}></span> 
                </div>
            </div>
        );
        }
    }
    export default Carousel;