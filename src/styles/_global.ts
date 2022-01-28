import { createGlobalStyle } from 'styled-components'
// import LexendBold from './../assets/fonts/Lexend/Lexend-Bold.ttf'

export const GlobalStyle = createGlobalStyle`

/* @font-face {
        font-family: 'Lexend';
        font-weight: 300;
        font-style: normal;
    } */
/* @font-face { font-family: "Lexend";
  src: url("../public/fonts/Lexend/Lexend-Bold.ttf");
  src: url("../public/fonts/Lexend/Lexend-ExtraBold.ttf");
  src: url("../public/fonts/Lexend/Lexend-Light.ttf");
  src: url("../public/fonts/Lexend/Lexend-Medium.ttf");
  src: url("../public/fonts/Lexend/Lexend-Regular.ttf");
  src: url("../public/fonts/Lexend/Lexend-SemiBold.ttf");
  src: url("../public/fonts/Lexend/Lexend-Thin.ttf");
} */

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  body{
    background: ${props => props.theme.colors.body};
    color: ${props => props.theme.colors.text};
    min-height: 100vh;
    max-width: 100vw;
    margin: 0;
    overflow: hidden; // Disable scrolling on body
  }

  button.nav-link{
    border: none;
    background: transparent;
  }

  #__next {
    position: relative;
    overflow: hidden;
    z-index: 0;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%; // 15px
      transition: font-size .15s ease-in;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%; // 14px
      transition: font-size .15s ease-in;
    }
  }

  @media (max-width: 468px) {
    html {
      font-size: 81%; // 13px
      transition: font-size .15s ease-in;
    }
  }

  label{
    margin: .275rem 0;
  }

  ul, ol, dl{
    padding: 0;
  }

  td{
    font-weight: 400;
  }



  body,
  input,
  textarea,
  button {
    font: 500 1rem Lexend, sans-serif;
    color: ${props => props.theme.colors.primary};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    font-family: Lexend, sans-serif;
    color: ${props => props.theme.colors.primary};
  }

  p{
    font-weight: 300;
  }

  // BOOSTRAP CUSTOM

  /* .dropdown-item {
    color: ${props => props.theme.colors.purple900} !important
  } */

  .text-muted{
    color: ${props => props.theme.colors.purple600} !important;
  }

  .text-primary{
    color: ${props => props.theme.colors.primary}!important
  }


  .list-group-item-action{
    color: ${props => props.theme.colors.purple800} !important;

    &:hover, &:focus{
      color: ${props => props.theme.colors.purple800} !important;
      background-color: ${props => props.theme.colors.purple200} !important;
    }
  }
  /* .list-group-item-action:hover, .list-group-item-action:focus{
    background-color: ${props => props.theme.colors.purple200} !important;
  } */

  /* .teste-enter {
    opacity: 0;
  }
  .teste-leave{
    background: black;
  }
  .teste-enter-active {
    opacity: 1;
    transition: opacity .5s ease-in;
  }
  .teste-exit {
    opacity: 1;
    transition: opacity .5s ease-out;
  }
  .teste-exit-active {
    opacity: 0;
    transition: opacity .5s ease-in;
  } */

  .modal-enter {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(-10%) ;
  }

  .modal-enter-active {
    opacity: 1;
    transform: translate(-50%, -50%) ;
    transition: opacity .5s, transform .5s;
    & + .modal-backdrop-component{
      background: rgba(0, 0, 0, 0.5);
      transition: background .5s;
    }

  }

  .modal-enter-done {
    & + .modal-backdrop-component{
      background: rgba(0, 0, 0, 0.5);
    }
  }

  .modal-exit {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(-10%);
    transition: opacity .5s, transform .5s;
    & + .modal-backdrop-component{
      background: rgba(0, 0, 0, 0);
      transition: background .5s;
    }
  }

  .modal-exit-active {
    opacity: 0;
  }

  .container-system{

    /* overflow: auto; */
    height: calc(
      100vh - ${props => props.theme.size.headerHomeHeightDesktop}
    )!important;

    @media screen and (max-width: 768px){
      height: calc(
        100vh - ${props => props.theme.size.headerHomeHeight}
      )!important;
    }
  }



  .modal-normal{
    transition: all .2s ease-out;
    /* margin: auto; */

    @media screen and (max-width: 568px){
      width: 100%;
      margin: 0;
      max-width: 100vw;

    }
  }
  .modal-expand{
    max-width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    transition: all .2s ease-out;

    @media screen and (max-width: 768px){
      width: 100%;
      margin: 0;
      margin-bottom: 1rem;
    }

    .modal-header{
      background: white;
      border-bottom: none;
      /* box-shadow: 0 0 1rem .25rem rgba(0, 0, 0, .075);*/
      box-shadow: 0 0 0.4rem 0px rgb(156 120 181 / 20%);
      z-index: 10;
      height: 3.5rem;

    }

    .modal-content{
      border-radius: 0;
      background: ${props => props.theme.colors.body};

      & > div{
        z-index: 1;

        &:first-child{
          z-index: 10;
        }
      }



      form{
        margin: auto;
        width: 60%;
        margin-top: 4rem;
        margin-bottom: 4rem;
        background: white;
        box-shadow: 0 0 .35rem 1px rgb(156 120 181 / 18%);
        /* box-shadow: 0 0 .5rem 0px rgba(50, 50, 50, .18); */
        border-radius: .5rem;
        border: 1px solid ${props => props.theme.colors.gray300};


        @media screen and (max-width: 996px){
          width: 70%;
        }

        @media screen and (max-width: 568px){
          width: 100%;
          margin: 0;
          margin-bottom: 1rem;
          border-radius: 0;
        }

        .modal-footer{
          padding-bottom: 1rem !important;
        }

      }
    }

    /* .modal-body{
      overflow: auto;
      height: calc(100vh - 4rem);
    } */

  }

  .alert-validate::before{
    content: attr(data-validate);
    position: absolute;
    max-width: fit-content;
    border: 1px solid red;
    background-color: ${props => props.theme.colors.purple100};
    border-radius: 2px;
    box-shadow: 0 1px 6px rgba(84, 32, 134, 0.25);
    padding: .25rem .5rem;
    top: 0;
    transform: translateY(-50%);
    right: 0px;
    pointer-events: none;
    color: ${props => props.theme.colors.purple900};
    font-size: .725rem;
    line-height: 1;
    text-align: left;
    visibility: hidden;
    opacity: 0;
    z-index: 100;
    transition: opacity 0.4s;
    border-image-slice: 1;

    border-width: 1px;
    border-image-source: ${props =>
      `linear-gradient(to left, #c4acd2, ${props.theme.colors.purple900}, #c4acd2)`} ;
  }

  div.alert-validate{
    color: #c80000;
    border-color: #c80000;
  }
  .alert-validate::after{
    content: "!";
    font-size: 1.125rem;
    color: #c80000;
    font-weight: bold;
    display: block;
    position: absolute;
    background-color: transparent;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 1rem;
  }

  .alert-validate.datepicker-isClearable::after{
    right: 1.25rem;
  }

  .alert-validate.alert-validate-with-icon-right:after{
    right: 2rem;
  }


  .alert-validate:hover:before{
    visibility: visible;
    opacity: 1;
  }


  @media (max-width: 992px){
    .alert-validate::before{
      visibility: visible;
      opacity: 1;
    }
  }

  .pe-2-25 {
    padding-right: 2.25rem !important;
  }


  .btn-light-custom{
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary}
  }



`
