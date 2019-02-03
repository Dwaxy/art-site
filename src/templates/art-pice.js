import React, { Component } from 'react'
import HeaderMeta from '../components/Helmet/Helmet.js'

import Header from '../components/Header/Header.js'
import Link from 'gatsby-link'
//import AddToCart from '../components/Cart/AddToCart.js'
import Order from '../components/Order/Order.js'
import { arrowSvg } from '../img/svg-index.js'
import InlineSVG from 'svg-inline-react'
import { kebabCase } from 'lodash'
import Img from 'gatsby-image'
import S from './art-pice.module.sass'


import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'
import 'typeface-cinzel'

const Info = (props) => (
  <div className={S.infoHolder}>
    <div className={S.priceHolder}>
      {props.data.price === "sold" || props.data.price === "SOLD" ?
        <div className={S.price}>
          <h3 style={{textTransform: "uppercase", fontFamily: "cinzel",}}>{props.data.price}</h3> 
        </div> 
        :
        <div className={S.price}>
          <h3>${props.data.price}</h3>
          <span>NZD</span>    
        </div> 
      }
    </div>
    <ul className={S.dataList}>
      <li>{props.data.original ? "original work" : "print"}</li>
      <li>{props.data.type}</li>
      <li style={{textTransform: "none"}}>{props.data.info}</li>
    </ul>
    
    {props.data.price === "sold" || props.data.price === "SOLD" 
      ?
        <div> </div>
      :
        <div className={S.buttonHolder}>
          <button 
            onClick={props.toggleForm}
            className={S.artItemButton}
          >
            <span>Place Order</span>
          </button> 
          
          
          {props.data.is_archive_item &&
             <button className={S.artItemButton}>
              <Link to = {`archive/${kebabCase(props.data.title)}`}  className={S.storeLink} >
                View In Archive
              </Link>
            </button> 
          }

        </div>
      
    }
  </div>
)

const Notes = (props) => (
  <div className={S.notesHolder}>
    {/* is it 's or s*/}
    <h3>Artists Notes</h3>
    <div className={S.notes}>
      <p>{props.data}</p>
    </div>
  </div>  
)

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      view: "info"
    }
  }
  
  toggleView = (i)=> {
    this.setState({view: i})
  }
  
  render() {
  
    return (
      <div id={S.Sidebar}>
        <div id={S.infoMenu}>
          <span onClick={this.toggleView.bind(this, "info")} className={this.state.view === "info" ? S.selected : ""}>Info</span>
          <span onClick={this.toggleView.bind(this, "notes")} className={this.state.view === "notes" ? S.selected : ""}>Notes</span>
        </div>
        
        {this.state.view === "info" && <Info data={this.props.data} toggleForm={this.props.toggleForm}/>}
        {this.state.view === "notes" && <Notes data={this.props.data.artistNotes || this.props.data.about}/>}
        
      </div>  
    )
  }
}

class ArtPice extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      maxWidth: this.updateWindowDimensions(),
      orderFormHidden: true
    }
    this.updateWindowDimensions()
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  updateWindowDimensions = () => { 
    if (typeof window !== 'undefined' && window ) {
      let maxWidth = window.innerHeight 
      return maxWidth
    } else {
      return
    }
  }
  
  toggleForm = () => {
    this.setState({orderFormHidden: !this.state.orderFormHidden})
  }
  
  render() {
        
    const itemData = this.props.pageContext.node.frontmatter
    const slug = this.props.pageContext.node.fields.slug
      //const itemId = this.props.pageContext.id
      
    return (
      <section className={S.artItemHolder}>
      
        <HeaderMeta 
          itemData={itemData} 
          subTitle={itemData.title}
          description={`${itemData.about} ${itemData.artistNotes}`} 
          pathName={this.props.location.pathname}
        />
        
        <Order 
          hidden={this.state.orderFormHidden} 
          toggleForm={this.toggleForm}
          orderData={[this.props.pageContext.node]}
        />
        
        <div className={S.artPiceHeader}>
          <Header to={["home", "index"]} white={true} />
        </div>
        
        <Link to = "/store"  className={S.storeLink} >
          <InlineSVG src={arrowSvg} />
        </Link>  
        
        <h1 id={S.title}>{itemData.title}</h1>
        
        <div className={S.left}>
          <Sidebar data={itemData} toggleForm={this.toggleForm}/>
        </div>
      
        <div 
          className={S.imageHolder} 
          style={{ "maxWidth": `calc(${this.state.maxWidth}px - 160px)` }}>
         
          <Img
            fluid={itemData.featuredImage.childImageSharp.fluid} 
            alt={`${itemData.type} ${itemData.original ? "original work" : "print"} ${itemData.title}`}
            className={S.innerImage}
            src=""
            critical={true}
          />
         
        </div>
        
        <div className={S.right}></div>
      
      </section>
    )
  }
}

export default ArtPice