import React, {RefObject} from "react";
import {FaBars} from "react-icons/fa";
import classes from "./NavBarCustomCmp.module.css";
import {consoleLogClient} from "../../utils/consoleMessage";



interface BaseElementProps {as?:string;  className?:string;   [key:string]:any; }
interface RenderToggleProps {onToggle:()=>void,  toggleCls:string;   isShow:boolean; }
interface NavHeaderProps {
  className?:string;  toggleIcon?:React.FC;
  renderToggle?: React.FC<RenderToggleProps>;
  [key:string]:any;
}
interface LinksContainerProps extends BaseElementProps {
  forwardRef?: RefObject<HTMLElement>;
}
interface NavBarCustomCmpProps extends BaseElementProps{
  maxHeight?: string;
  style?: {[key:string]:string | number}
}
interface NavBarCustomCmpInter {
  LinkItem:React.FC<BaseElementProps>;
  IconItem:React.FC<BaseElementProps>;
  NaVHeader:React.FC<NavHeaderProps>;
  LinksContainer:React.FC<LinksContainerProps>;
  IconsContainer:React.FC<BaseElementProps>;
}

const {navBarCls, navCenterCls, navHeaderCls, navToggleCls, linksContainerCls,
  showContainerCls, linkItemCls, iconContainerCls, iconItemCls} = classes;



const NavBarCustomCmp: React.FC<NavBarCustomCmpProps> & NavBarCustomCmpInter = ({className, maxHeight, style={}, children, ...otherProps}) => {
  const [show, setShow] = React.useState(true);
  const navBarClass = navBarCls + (className ? ` ${className}` : "");
  const navCenterClass = navCenterCls + (show ? ` ${showContainerCls}` : "");
  if (maxHeight) {style["--max-height"] = maxHeight}
  // consoleLogClient("NavBarCustomCmp Render ==>", classes);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <nav className={navBarClass} style={style} {...otherProps}>
      <div className={navCenterClass}>
        {children}
      </div>
    </nav>
  )
};

const LinkItem:React.FC<BaseElementProps> = ({as="div", className, children, ...otherProps}) => {
  const elemClass = linkItemCls + (className ? ` ${className}` : "");
  return React.createElement(as, {className:elemClass, children, ...otherProps});
};
const IconItem:React.FC<BaseElementProps> = ({as="div", className, children, ...otherProps}) => {
  const elemClass = iconItemCls + (className ? ` ${className}` : "");
  return React.createElement(as, {className:elemClass, children, ...otherProps});
};
const NaVHeader:React.FC<NavHeaderProps> = ({children, className, toggleIcon=<FaBars />, renderToggle:TGL, ...otherProps}) => {
  const [show, setShow] = React.useState(false);
  const navHeaderClass = navHeaderCls + (show ? ` ${showContainerCls}` : "") + (className ? ` ${className}` : "");
  const toggleShow = () => {setShow(!show); };
  return (
    <div className={navHeaderClass} {...otherProps}>
      {children}
      {TGL ? <TGL onToggle={toggleShow} toggleCls={navToggleCls} isShow={show}  />:
        <button onClick={toggleShow} className={navToggleCls} >{toggleIcon}</button> }
    </div>
  );
};
const LinksContainer:React.FC<LinksContainerProps> = ({as="div", forwardRef, className, children, ...otherProps}) => {
  // const [maxHeight, setMaxHeight] = React.useState(0);
  // const elemRef = React.useRef<HTMLDivElement>(null);
  const elemClass = linksContainerCls + (className ? ` ${className}` : "");
  // style["--max-height"] = maxHeight + "px";
  // React.useEffect(()=>{
  //   consoleLogClient("Use Effect - 1 ==>", elemRef.current?.children.length);
  //   // consoleLogClient("Use Effect - 1 ==>", elemRef.current?.firstElementChild?.offsetHeight);
  //   let quantity = elemRef.current?.children.length;
  //   if (!quantity) {return; }
  //   const height = (elemRef.current?.children[0] as HTMLElement).offsetHeight * quantity;
  //   setMaxHeight(height || 0);
  // });
  return React.createElement(as, {ref:forwardRef, className:elemClass, children, ...otherProps});
};
const IconsContainer:React.FC<BaseElementProps> = ({as="div", className, children, ...otherProps}) => {
  const elemClass = iconContainerCls + (className ? ` ${className}` : "");
  return React.createElement(as, {className:elemClass, children, ...otherProps});
};

NavBarCustomCmp.NaVHeader = NaVHeader;
NavBarCustomCmp.LinkItem = LinkItem;
NavBarCustomCmp.IconItem = IconItem;
NavBarCustomCmp.LinksContainer = LinksContainer;
NavBarCustomCmp.IconsContainer = IconsContainer;


export default NavBarCustomCmp;


// ======================= SCHEMA =====================//
//
// _____ Standard ==== width > 800px
// <NavCenter>  flex-direction=row;  align=center;
//    <Header(flex)>CHILDREN <+> Toggle(none)</Header>   <LinksCont>CHILDREN</LinksCont>   <IconsCont>CHILDREN</IconsCont>
//                                  ||
//                  .navHeaderCls > :last-child { display:none; }

// _____ Max Width ==== max-width: 800px
// <NavCenter>  flex-direction=column;  align=inherit;
//    <Header(flex)> CHILDREN  <+> Toggle(visible) </Header>      .navHeaderCls > :last-child { display:block; }
//    <LinksCont> CHILDREN </LinksCont>                         .linksContainerCls {flex-direction: column;   }
//    (none)<IconsCont> CHILDREN </IconsCont>             .navCenterCls > :last-child{ display: none }
//
//
//  Header       ==>  * - overflow-y:hidden;  max-height:0;
//  Header.show  ==>  * - overflow-y:hidden;  max-height:var(--max-height);
//
//                    LinksContCls - transition: all 0.4s ease-out;  -- animation on closing
//  Header.show  ==>  LinksContCls - transition: all 0.4s ease-in;   -- animation on opening
//
//
//  overflow:auto = overflow:hidden -
//  animation/transition speed is calculated depend on max-height value - not real height value - so to compensate this we have two different animation which going fast in no-visible segment.
//  So "--max-height" value can be overwrite by components "style" property;
//  But Calculated once at start when max-width>800px is broking possibility to calculate "--max-height" in <LinksContainer>
//    - <LinkItem>'s height is different when max-width>800px
//

