import React from 'react';
import Link from 'gatsby-link'
import LogoSides from '../../img/logo-side-left.svg'
import S from './header.module.sass'
import ReactVivus from 'react-vivus'
import InlineSVG from 'svg-inline-react'

//takes a props that is an array of two "to" strings
// these make up the two menu items
//takes a white prop that is true of false

const MenuItem = (props) => (
  <Link to={props.to === "home" ? "/" :`/${props.to}`} 
    key={props.to} 
    className={S.link}
    >
    {props.to === "/" ? "home" : props.to}
  </Link>  
)

// const side = <ReactVivus
//           option={{
//             file: LogoSides,
//             animTimingFunction: 'EASE_OUT',
//             type: 'delayed',
//             duration: 400,
//             onReady: console.log
//           }}
//           style={{width: "268px", height: "57px" }}
//           callback={console.log}
//         />

//console.log(LogoSides)

const logoSvg = `
<svg width="147px" height="73px" viewBox="0 0 147 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Art-Shop-" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Tablet-Portrait" transform="translate(-309.000000, -88.000000)" fill="#10090D">
            <g id="Group" transform="translate(309.000000, 88.000000)">
                <path d="M79.8377253,41.8305826 L79.8472401,41.8210678 L73.1297257,35.1035534 L66.4122113,41.8210678 L66.4499007,41.8587572 L54.1543289,54.1543289 L-5.69544412e-14,-9.71445147e-17 L146.617316,0 L92.3122292,54.3050865 L79.8377253,41.8305826 Z M78.3377253,43.3305826 L90.4317639,55.4246212 L73.1579003,72.6984848 L55.8840367,55.4246212 L67.9499007,43.3587572 L73.1297257,48.5385822 L78.3377253,43.3305826 Z" id="Combined-Shape"></path>
            </g>
        </g>
    </g>
</svg>`

const Header = (props) => (
  <section id={S.Header} className={props.id}>
    <div className={S.logoHolder} id={props.white ? S.white : S.black}>
    
      <div className={S.left}>
        <ReactVivus
          id={props.isIndexPage ? S.svgLeftAtIndex : S.svgLeft }
          option={{
            file: LogoSides,
            animTimingFunction: 'EASE_OUT',
            type: 'delayed',
            duration: 400,
            forceRender: true,
          }}
          style={{width: "268px", height: "57px" }}
          callback={console.log}
        />
        <MenuItem to={props.to[0]} />
      </div>

      <div className={S.mainLogo}>
        <InlineSVG src={logoSvg} />
      </div>
      
      <div className={S.right}>
        <ReactVivus
          id={S.svgRight}
          option={{
            file: LogoSides,
            animTimingFunction: 'EASE_OUT',
            type: 'delayed',
            duration: 400,
            forceRender: true,
          }}
          style={{width: "268px", height: "57px" }}
          callback={console.log}
        />
        <MenuItem to={props.to[1]} />
      </div>
      
    </div>

  </section>  
)

export default Header