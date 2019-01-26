import React, {Component} from 'react'
import HeaderMeta from '../components/Helmet/Helmet.js'
import Header from '../components/Header/Header.js'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import S from './mediums.module.sass'

import 'typeface-alegreya-sans-sc'
import 'typeface-cinzel-decorative'
import 'typeface-cinzel'

//IS IT WATERCOLOR WITH A "U" IN NZ?

class MediumsRoute extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    
    const allTitles = []
    
    const postLinks = posts.map( post => {
      allTitles.push(post.node.frontmatter.title)
      return (
        <div key={post.node.fields.slug} className={S.imageItem}>
          <Link to={post.node.fields.slug}>
            <h2>{post.node.frontmatter.title}</h2>
            <Img
              fluid={post.node.frontmatter.featuredImage.childImageSharp.fluid} 
            />
          </Link>
        </div>
      )
    })
    
    //there is no type passed to types only tag through context
    const medium = this.props.pageContext.medium
    
    //const totalCount = this.props.data.allMarkdownRemark.totalCount not used
    
    return (
      <section id={S.Medium}>
      
        <HeaderMeta pageTitle={medium} itemGroup={allTitles}/>
        
        <div className={S.headerHolder}>        
          <div className={S.header}>
            <Header to={["home", "cart"]} white={true} />
          </div>
        </div>
        
        <h1 id={S.mediumTitle}>{medium}</h1>
        <div className={S.imageGrid}>
          {postLinks}
        </div>
      
      </section>
    )
  }
}

export default MediumsRoute

//can pass tag data through context in node.js
//but I'm not goinf to bc I want fixed images for thumbnails
//and the node query gets fluid images
export const mediumsPageQuery = graphql`
query mediumsPage($medium: String) {
  allMarkdownRemark(
    sort: {fields: [frontmatter___date], order: DESC}, 
    filter: {frontmatter: {type: {in: [$medium]}}}
    ) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          featuredImage {
            childImageSharp {
              fluid(maxHeight: 300){
                src
                sizes
                srcSet
                srcWebp
                srcSetWebp
                aspectRatio
              }
            }
          }
        }
      }
    }
  }
}
`
// sizes
// base64
// srcSet
// aspectRatio

