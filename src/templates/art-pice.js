import React, { Component } from 'react'
import HeaderMeta from '../components/Helmet/Helmet.js'

import Header from '../components/Header/Header.js'
import Link from 'gatsby-link'
import BackButton from '../components/BackButton/BackButton.js'

import Order from '../components/Order/Order.js'
import { kebabCase } from 'lodash'
import ArtImage from '../components/ArtImgae/ArtImage'
import S from './art-pice.module.sass'

import showdown from 'showdown'


import '../../node_modules/typeface-alegreya-sans-sc'
import '../../node_modules/typeface-lora'
import '../../node_modules/typeface-cinzel'

const Price = (props) => {
  if(props.data.price === "sold" || props.data.price === "SOLD") {
    return (
      <div className={S.price}>
        <h3 style={{textTransform: "uppercase", fontFamily: "cinzel",  fontSize: "0.7em"}}>{props.data.price}</h3> 
      </div> 
    )
  } else if(props.data.tags.includes("Commission")) {
    return (
      <div className={S.price}>
        <h3 style={{textTransform: "capitalize", fontFamily: "cinzel", fontSize: "0.7em"}}>Commissioned Piece</h3>  
      </div> 
    )
  } else if(props.data.tags.includes("archive") || props.data.tags.includes("Archive")) {
    return (
      <div className={S.price}>
        <h3 style={{textTransform: "capitalize", fontFamily: "cinzel", fontSize: "0.7em"}}>Archived Piece</h3>  
      </div> 
    )
  } else {
    return (
      <div className={S.price}>
        <h3>${props.data.price}</h3>
        <span>NZD</span>    
      </div> 
    )
  }
}

const Info = (props) => {

  return (
    <div className={S.infoHolder}>
      <div className={S.priceHolder}>
        <Price data={props.data}/>
      </div>
      <ul className={S.dataList}>
        <li>{props.data.original ? "original work" : "print"}</li>
        <li>{props.data.type}</li>
        <li style={{textTransform: "none"}}>{props.data.info}</li>
      </ul>
    
          <div className={S.buttonHolder}>
            {props.data.is_store_item && 
            props.data.price !== "SOLD" &&
            props.data.price !== "sold" &&
            !props.data.tags.includes("Archive") &&
            !props.data.tags.includes("Commission") &&
          
              <button 
                onClick={props.toggleForm}
                className={S.artItemButton}
              >
                <span>Place Order</span>
              </button> 
            }
            
            {props.data.is_archive_item &&
              <button className={S.artItemButton}>
                <Link to = {`archive/${kebabCase(props.data.title)}`}  className={S.storeLink} >
                  View In Archive
                </Link>
              </button> 
            }

          </div>
        
      
    </div>
  )
}

const Notes = (props) => {
  const converter = new showdown.Converter()
  return (
    <div className={S.notesHolder}>
    {/* is it 's or s*/}
    <h3>Artists Notes</h3>
    <div className={S.notes}>
      <div className={S.notes} dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.data) || "Notes are yet to come" }} />
    </div>
  </div>  
  )
}

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
          <span role="button" tabIndex="0" onClick={this.toggleView.bind(this, "info")} onKeyDown={this.toggleView.bind(this, "info")} className={this.state.view === "info" ? S.selected : ""}>Info</span>
          <span role="button" tabIndex="0" onClick={this.toggleView.bind(this, "notes")} onKeyDown={this.toggleView.bind(this, "notes")} className={this.state.view === "notes" ? S.selected : ""}>Notes</span>
        </div>
        
        {this.state.view === "info" && <Info data={this.props.data} toggleForm={this.props.toggleForm}/>}
        {this.state.view === "notes" && <Notes data={this.props.data.artistNotes}/>}
        
      </div>  
    )
  }
}

class ArtPice extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      orderFormHidden: true,
    }
  }

  toggleForm = () => {
    this.setState({orderFormHidden: !this.state.orderFormHidden})
  }
  
  render() {
        
    const itemData = this.props.pageContext.node.frontmatter

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

        <BackButton />
        
        <h1 id={S.title}>{itemData.title}</h1>
        
        <div className={S.left}>
          <Sidebar data={itemData} toggleForm={this.toggleForm}/>
        </div>
      
        <div className={S.imageHolder}>
         
          <ArtImage imageData={itemData} className={S.innerImage} critical={true} fluid={itemData.featuredImage.childImageSharp.fluid}/>
         
        </div>
        
        <div className={S.right}></div>
      
      </section>
    )
  }
}

export default ArtPice
