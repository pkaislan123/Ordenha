import React  from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './styles.scss';
import class2 from '../../assets/imgs/capa1.png';
import class3 from '../../assets/imgs/capa2.png';


const Carrosel = () => {
    return (
        <div style={{ display: 'display:block '}}>

        <Carousel  variant="dark"  slide={false} fade={false}>
       
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={class2}
            alt="Second slide"
          />
      
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={class3}
            alt="Third slide"
          />
      
        </Carousel.Item>
      </Carousel>
      </div>
    )
}
export default Carrosel;