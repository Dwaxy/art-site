const postcssPresetEnv = require(`postcss-preset-env`)
const rucksack = require(`rucksack-css`)
const center = require(`postcss-center`)
const alias = require(`postcss-alias`)
const short = require(`postcss-short`)

module.exports = {
  siteMetadata: {
    title: 'Elloron Arts',
    siteUrl: `https://elloron.art`,
    tagLine: 'All paths lead to the mountain',
    description: 'Explore a world. An Archive of lore, illustrations, and short stories - a library of emerging lore.',
    wordings: [
      "All paths lead to the Mountain",
      "A place where none can find you",
      "The words of distant places",
      "Sights of such wonder",
      "To meet what comes",
      "And we breath in, then speak",
      "Two worlds, and a place in between",
      "Where Mountains and Sky join, the Bridge",
      "Inbark on your Crossing",
      "The Fire Brings the Dawn",
    ],
    commissionsOpen: true,
    postingZones: [
      {
        postingCost: 0,
        name: "New Zealand",
      },
      {
        postingCost: 10,
        name: "Australia",
      },
      {
        postingCost: 20,
        name: "South Pacific",
      },
      {
        postingCost: 30,
        name: "Asia",
      },
      {
        postingCost: 40,
        name: "Canada, UK, Europe or US",
      },
      {
        postingCost: 50,
        name: "The rest of the World",
      },
    ],
    globalItemBuffer: 30,
  },
  plugins: [
  
    'gatsby-plugin-sitemap',
    //"gatsby-image-sitemap",
    'gatsby-plugin-robots-txt',
    
    
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          rucksack(),
          center(),
          alias(),
          short(),
          postcssPresetEnv({
            stage: 0,
          }),
        ]
        // precision: 8,
      }
    },
    
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-100204166-5",
        // Puts tracking script in the head instead of the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
      },
    },
    
    'gatsby-plugin-react-helmet',
    
    // the way this loads svgs does not work with what I'm using to animate them. Using an inline svg comp
    // { 
    //   resolve: 'gatsby-plugin-react-svg',
    //   options: {
    //       include: /img/
    //   }
    // },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
        
           // go before gatsby-remark-images
          
          //'gatsby-remark-relative-images', //change
          
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1000,
            },
          },
        
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
