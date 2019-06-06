import React, { Component } from 'react';
import './carousel.css';
import Pic1 from './librarycarousel.png';
import Pic2 from './lib1.png';
import Pic3 from './ntualibrary.png';

class Carousel extends Component {
	constructor() {
		super();
		this.state = {
            slideIndex: 1
           
        };
    };
    
    componentDidMount(){
        console.log(this.state);

    }
     
    
    nextSlide = ()=>{
        console.log(this.state);
        let t= (this.state.slideIndex+1)%3+1;
        this.setState({
            slideIndex : t
        } )
    }
    prevSlide = () => {
        console.log(this.state);
        let t = (this.state.slideIndex===1)?3:(this.state.slideIndex-1);
        this.setState({
            slideIndex : t
        } )
    }
    
    currentSlide=(n)=>{
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
                        <h3 className="text">Welcome to the NTUA Library</h3>
                    </div>
                    

                    <div className="mySlides fade" style={{
                        display : (this.state.slideIndex===2)?"block":"none"
                        }}>
                        <div className="numbertext">2 / 3</div>
                        <img src={Pic2}  style={{width:"100%"}}/>
                        <h3 className="text">Explore the Library</h3>
                    </div>
                    
                    <div className="mySlides fade"style={{
                        display : (this.state.slideIndex===3)?"block":"none"
                        }}>
                        <div className="numbertext">3 / 3</div>
                        <img src={Pic3}  style={{width:"100%"}}/>

                    </div>

                    <a className="prev" onClick={this.prevSlide}>&#10094;</a>
                    <a className="next" onClick={this.nextSlide}>&#10095;</a>

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