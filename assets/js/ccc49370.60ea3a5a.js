"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6103],{8665:function(e,t,a){a.d(t,{Z:function(){return b}});var n=a(3366),l=a(7294),r=a(6010),i=a(7019),s=a(9960),m="sidebar_q+wC",o="sidebarItemTitle_9G5K",c="sidebarItemList_6T4b",d="sidebarItem_cjdF",u="sidebarItemLink_zyXk",g="sidebarItemLinkActive_wcJs",v=a(5999);function p(e){var t=e.sidebar;return 0===t.items.length?null:l.createElement("nav",{className:(0,r.Z)(m,"thin-scrollbar"),"aria-label":(0,v.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,r.Z)(o,"margin-bottom--md")},t.title),l.createElement("ul",{className:c},t.items.map((function(e){return l.createElement("li",{key:e.permalink,className:d},l.createElement(s.Z,{isNavLink:!0,to:e.permalink,className:u,activeClassName:g},e.title))}))))}var h=["sidebar","toc","children"];var b=function(e){var t=e.sidebar,a=e.toc,s=e.children,m=(0,n.Z)(e,h),o=t&&t.items.length>0;return l.createElement(i.Z,m,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},o&&l.createElement("aside",{className:"col col--3"},l.createElement(p,{sidebar:t})),l.createElement("main",{className:(0,r.Z)("col",{"col--7":o,"col--9 col--offset-1":!o}),itemScope:!0,itemType:"http://schema.org/Blog"},s),a&&l.createElement("div",{className:"col col--2"},a))))}},8561:function(e,t,a){a.d(t,{Z:function(){return N}});var n=a(7294),l=a(6010),r=a(3905),i=a(5999),s=a(9960),m=a(4996),o=a(3810),c=a(7707),d=a(6753),u="blogPostTitle_d4p0",g="blogPostData_-Im+",v="blogPostDetailsFull_xD8n",p=a(62),h="image_9q7L";var b=function(e){var t=e.author,a=t.name,l=t.title,r=t.url,i=t.imageURL;return n.createElement("div",{className:"avatar margin-bottom--sm"},i&&n.createElement(s.Z,{className:"avatar__photo-link avatar__photo",href:r},n.createElement("img",{className:h,src:i,alt:a})),a&&n.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},n.createElement("div",{className:"avatar__name"},n.createElement(s.Z,{href:r,itemProp:"url"},n.createElement("span",{itemProp:"name"},a))),l&&n.createElement("small",{className:"avatar__subtitle",itemProp:"description"},l)))},E="authorCol_8c0z";function f(e){var t=e.authors,a=e.assets;return 0===t.length?null:n.createElement("div",{className:"row margin-top--md margin-bottom--sm"},t.map((function(e,t){var r;return n.createElement("div",{className:(0,l.Z)("col col--6",E),key:t},n.createElement(b,{author:Object.assign({},e,{imageURL:null!=(r=a.authorsImageUrls[t])?r:e.imageURL})}))})))}var N=function(e){var t,a,h,b,E=(h=(0,o.c2)().selectMessage,function(e){var t=Math.ceil(e);return h(t,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),N=(0,m.C)().withBaseUrl,_=e.children,Z=e.frontMatter,k=e.assets,P=e.metadata,L=e.truncated,C=e.isBlogPostPage,T=void 0!==C&&C,w=P.date,y=P.formattedDate,I=P.permalink,x=P.tags,H=P.readingTime,A=P.title,M=P.editUrl,B=P.authors,U=null!=(t=k.image)?t:Z.image,R=!T&&L,S=x.length>0;return n.createElement("article",{className:T?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(b=T?"h1":"h2",n.createElement("header",null,n.createElement(b,{className:u,itemProp:"headline"},T?A:n.createElement(s.Z,{itemProp:"url",to:I},A)),n.createElement("div",{className:(0,l.Z)(g,"margin-vert--md")},n.createElement("time",{dateTime:w,itemProp:"datePublished"},y),void 0!==H&&n.createElement(n.Fragment,null," \xb7 ",E(H))),n.createElement(f,{authors:B,assets:k}))),U&&n.createElement("meta",{itemProp:"image",content:N(U,{absolute:!0})}),n.createElement("div",{className:"markdown",itemProp:"articleBody"},n.createElement(r.Zo,{components:c.Z},_)),(S||L)&&n.createElement("footer",{className:(0,l.Z)("row docusaurus-mt-lg",(a={},a[v]=T,a))},S&&n.createElement("div",{className:(0,l.Z)("col",{"col--9":R})},n.createElement(p.Z,{tags:x})),T&&M&&n.createElement("div",{className:"col margin-top--sm"},n.createElement(d.Z,{editUrl:M})),R&&n.createElement("div",{className:(0,l.Z)("col text--right",{"col--3":S})},n.createElement(s.Z,{to:P.permalink,"aria-label":"Read more about "+A},n.createElement("b",null,n.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},9360:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var n=a(7294),l=a(1217),r=a(8665),i=a(8561),s=a(5999),m=a(9960);var o=function(e){var t=e.nextItem,a=e.prevItem;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,s.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"})},n.createElement("div",{className:"pagination-nav__item"},a&&n.createElement(m.Z,{className:"pagination-nav__link",to:a.permalink},n.createElement("div",{className:"pagination-nav__sublabel"},n.createElement(s.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post"},"Newer Post")),n.createElement("div",{className:"pagination-nav__label"},"\xab ",a.title))),n.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t&&n.createElement(m.Z,{className:"pagination-nav__link",to:t.permalink},n.createElement("div",{className:"pagination-nav__sublabel"},n.createElement(s.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post"},"Older Post")),n.createElement("div",{className:"pagination-nav__label"},t.title," \xbb"))))},c=a(3810),d=a(1575);var u=function(e){var t,a=e.content,s=e.sidebar,m=a.frontMatter,u=a.assets,g=a.metadata,v=g.title,p=g.description,h=g.nextItem,b=g.prevItem,E=g.date,f=g.tags,N=g.authors,_=m.hide_table_of_contents,Z=m.keywords,k=m.toc_min_heading_level,P=m.toc_max_heading_level,L=null!=(t=u.image)?t:m.image;return n.createElement(r.Z,{wrapperClassName:c.kM.wrapper.blogPages,pageClassName:c.kM.page.blogPostPage,sidebar:s,toc:!_&&a.toc&&a.toc.length>0?n.createElement(d.Z,{toc:a.toc,minHeadingLevel:k,maxHeadingLevel:P}):void 0},n.createElement(l.Z,{title:v,description:p,keywords:Z,image:L},n.createElement("meta",{property:"og:type",content:"article"}),n.createElement("meta",{property:"article:published_time",content:E}),N.some((function(e){return e.url}))&&n.createElement("meta",{property:"article:author",content:N.map((function(e){return e.url})).filter(Boolean).join(",")}),f.length>0&&n.createElement("meta",{property:"article:tag",content:f.map((function(e){return e.label})).join(",")})),n.createElement(i.Z,{frontMatter:m,assets:u,metadata:g,isBlogPostPage:!0},n.createElement(a,null)),(h||b)&&n.createElement(o,{nextItem:h,prevItem:b}))}},6753:function(e,t,a){a.d(t,{Z:function(){return u}});var n=a(7294),l=a(5999),r=a(7462),i=a(3366),s=a(6010),m="iconEdit_mS5F",o=["className"];var c=function(e){var t=e.className,a=(0,i.Z)(e,o);return n.createElement("svg",(0,r.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,s.Z)(m,t),"aria-hidden":"true"},a),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))},d=a(3810);function u(e){var t=e.editUrl;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:d.kM.common.editThisPage},n.createElement(c,null),n.createElement(l.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},1575:function(e,t,a){a.d(t,{Z:function(){return c}});var n=a(7462),l=a(3366),r=a(7294),i=a(6010),s=a(5002),m="tableOfContents_vrFS",o=["className"];var c=function(e){var t=e.className,a=(0,l.Z)(e,o);return r.createElement("div",{className:(0,i.Z)(m,"thin-scrollbar",t)},r.createElement(s.Z,(0,n.Z)({},a,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},5002:function(e,t,a){a.d(t,{Z:function(){return o}});var n=a(7462),l=a(3366),r=a(7294),i=a(3810),s=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function m(e){var t=e.toc,a=e.className,n=e.linkClassName,l=e.isChild;return t.length?r.createElement("ul",{className:l?void 0:a},t.map((function(e){return r.createElement("li",{key:e.id},r.createElement("a",{href:"#"+e.id,className:null!=n?n:void 0,dangerouslySetInnerHTML:{__html:e.value}}),r.createElement(m,{isChild:!0,toc:e.children,className:a,linkClassName:n}))}))):null}function o(e){var t=e.toc,a=e.className,o=void 0===a?"table-of-contents table-of-contents__left-border":a,c=e.linkClassName,d=void 0===c?"table-of-contents__link":c,u=e.linkActiveClassName,g=void 0===u?void 0:u,v=e.minHeadingLevel,p=e.maxHeadingLevel,h=(0,l.Z)(e,s),b=(0,i.LU)(),E=null!=v?v:b.tableOfContents.minHeadingLevel,f=null!=p?p:b.tableOfContents.maxHeadingLevel,N=(0,i.DA)({toc:t,minHeadingLevel:E,maxHeadingLevel:f}),_=(0,r.useMemo)((function(){if(d&&g)return{linkClassName:d,linkActiveClassName:g,minHeadingLevel:E,maxHeadingLevel:f}}),[d,g,E,f]);return(0,i.Si)(_),r.createElement(m,(0,n.Z)({toc:N,className:o,linkClassName:d},h))}},7774:function(e,t,a){a.d(t,{Z:function(){return o}});var n=a(7294),l=a(6010),r=a(9960),i="tag_WK-t",s="tagRegular_LXbV",m="tagWithCount_S5Zl";var o=function(e){var t,a=e.permalink,o=e.name,c=e.count;return n.createElement(r.Z,{href:a,className:(0,l.Z)(i,(t={},t[s]=!c,t[m]=c,t))},o,c&&n.createElement("span",null,c))}},62:function(e,t,a){a.d(t,{Z:function(){return o}});var n=a(7294),l=a(6010),r=a(5999),i=a(7774),s="tags_NBRY",m="tag_F03v";function o(e){var t=e.tags;return n.createElement(n.Fragment,null,n.createElement("b",null,n.createElement(r.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),n.createElement("ul",{className:(0,l.Z)(s,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return n.createElement("li",{key:a,className:m},n.createElement(i.Z,{name:t,permalink:a}))}))))}}}]);