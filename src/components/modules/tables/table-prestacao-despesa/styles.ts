import styled from 'styled-components'

export const MainIcons = styled.span`
	.btn-edit {
		height: 50px;
	}

`

export const DivMainContent = styled.div`
        display: flex;
        justify-content: flex-start;
        align-items: center;

`

export const DivSelectAccount = styled.div`

  .styled-select {
	  position:relative; 
	  border:solid 1px #888888; 
	  overflow:hidden; 
	  display:block; 
	  width:auto; 
	  margin:auto; 
	  font-size:1em; /*use this to scale the select*/
	}


	.styled-select select {
      padding: 5px;
	  width:100%;
	  font-size: .9em;
	  height: 2em;
	  margin: 0;
	  background: rgb(0, 0, 27); /*IE Fallback*/
	  background: rgba(0, 0, 27, 0);
	  color:#888;
	  border:none;
	  outline:none;
	  display: inline-block;
	  -webkit-appearance:none;
	  -moz-appearance:none;
	  appearance:none;
	  cursor:pointer;
	}
	
	.styled-select select option {
		background-color: #fff;
	}

	.styled-select .select-button {
	  /* background-color:#68696D; */
	  right:10px; top:3px;
	  position:absolute;
	  pointer-events:none;
	  /*text-align: center; vertical-align: middle; */
	  width: 2em; height: 1.8em;
	}
	
	.styled-select .select-button .select-button-text {
		color: #fff;
		line-height: 1.8em;
		text-align: center;
		display: block;
	}
	
	.styled-select .select-button .select-button-text span{
		font-size: 1em;
	}


	.small-arrow-down {
		width: 0; 	
		height: 0; 	 
		border-left: .4em solid transparent; 
		border-right: .4em solid transparent; 
		border-top: .4em solid #fff; 
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}

	.lt-ie10 .styled-select {
		background: #fff;
		border: none;
	}
	
	.lt-ie10 .styled-select .select-button {
		display: none;
	}
`
