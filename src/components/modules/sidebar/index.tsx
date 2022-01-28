import { NextPage } from 'next'
import Link from 'next/link'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { BiX } from 'react-icons/bi'
import { ThemeContext } from 'styled-components'
import { useApp } from '../../../context/appContext'
import { ICON_LIBRARY } from '../../../types/icon'
import Icon from '../../elements/icon'
import { Scrollbar } from '../../elements/scrollbar'
import ActiveLink from '../../wrappers/link'
import { useEnterComponent } from './../../../hooks/useEnterComponent'
import { useOutsideComponent } from './../../../hooks/useOutsideComponent'
import { useResize } from './../../../hooks/useResize'
import SidebarItem, {
  items,
  menuCollapsed,
  menuOpened,
  menuMobile,
} from './itemsMenu'
import { CheckboxStyle, SidebarStyles } from './styles'

type SidebarListProps = {
  items: SidebarItem[]
  selectedItems: SidebarItem[]
  onSidebarListChange: (selectedItems: SidebarItem[]) => void
}

type SidebarListItemProps = {
  selected: boolean
  label: string
  onChange: (selected: boolean) => void
}

const Sidebar: NextPage = props => {
  // const [selectedItems, setSelectedItems] = useState([])
  const { open, close, toggleFixedSidebar, isOpen, isFixed } = useApp()
  const theme = useContext(ThemeContext)
  const [menuSettings, setMenuSettings] = useState({})
  const [windowDimensions, setWindowDimensions] = useState(768)
  
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowDimensions])
  

  useEffect(() => {

    if (windowDimensions <= 580 && isFixed) {
      setMenuSettings(menuMobile)

    } else if (windowDimensions && isFixed) {
      setMenuSettings(menuOpened)

    } else if(!isFixed){
      setMenuSettings(menuCollapsed)
    }
  }, [isFixed])
  
  function renderMenu(item, nivel) {
    var childGrowDirection = ''
    var currentGrowDirection = ''

    if (menuSettings[nivel + 1]) {
      childGrowDirection = menuSettings[nivel + 1]
    } else {
      childGrowDirection = menuSettings[0]
    }

    if (menuSettings[nivel]) {
      currentGrowDirection = menuSettings[nivel]
    } else {
      currentGrowDirection = menuSettings[0]
    }

    const [mouseOver, setMouseOver] = useState(false)
    const [top, setTop] = useState(0)
    const [right, setRight] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const flagActive = () => setIsActive(!isActive)
  
    

    return (
      <ul className={`${item.disabled ? 'disabled' : '' } ${currentGrowDirection + '-ul' } `}>
        <li
          key={item.id}
          className={`${currentGrowDirection}-liMenus `}
          onMouseEnter={function (element) {
            childGrowDirection === 'rightSide' ? setMouseOver(true) : undefined,
              setTop(element.currentTarget.getBoundingClientRect().top),
              setRight(element.currentTarget.getBoundingClientRect().right)
          }}
          onMouseLeave={() => setMouseOver(false)}>
          <ActiveLink href={item.link}>
            <>
              <a href={item?.items?.length > 0 ? '#' : item.link} onClick={childGrowDirection == 'down' ? flagActive : undefined} className="sidebar-link">
                <div className="icon-container">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                <i className={`arrowMenu ${isActive && childGrowDirection === 'down' ? 'collapsedArrow' : ''}`}>
                  {item?.items?.length > 0 ? (<Icon icon="FaAngleRight" iconLibrary={ICON_LIBRARY.FONT_AWESOME}/>) : ('')}{' '}
                </i>
              </a>
              <div
                style={childGrowDirection === 'rightSide' ? { top: top, left: right }: {}} className={`submenu ${childGrowDirection} ${mouseOver ? childGrowDirection + '-openMenu': childGrowDirection + '-closeMenu'} ${!isActive && childGrowDirection ==='down' ? 'collapsed' : ''} `}>
                {item.items ? item.items.map(function (item) {
                      return renderMenu(item, nivel + 1)
                    })
                  : ''}
              </div>
            </>
          </ActiveLink>
        </li>
      </ul>
    )
  }
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { screenWidth } = useResize()

  const handleCloseSidebar = useCallback(() => {
    if (screenWidth >= 768 && isFixed) {
      return null
    } else {
      if (isFixed) toggleFixedSidebar()
      close()
    }
  }, [screenWidth, isOpen, isFixed, toggleFixedSidebar])

  useOutsideComponent(sidebarRef, handleCloseSidebar)

  const openSidebar = useCallback(
    (isOpen: boolean) => {
      if (screenWidth < 768) return

      if (isOpen) open()
      else {
        close()
      }
    },
    [screenWidth]
  )

  useEnterComponent(
    sidebarRef,
    () => openSidebar(true),
    () => openSidebar(false)
  )

  return (
    <SidebarStyles ref={sidebarRef} fixedSidebar={isFixed ? '1' : '0'}>
      <div className={`sidebar ${isOpen || isFixed ? 'sidebar-show' : ''}`}>
        <div>
          <header className="d-flex align-items-center">
            <Link href="/">
              <a href="/" className="logo">
                <img
                  src="/img/logo-dark.svg"
                  alt="VTech Consultoria"
                  width="0"
                  height="38px"
                />
              </a>
            </Link>

            <div
              className={`sidenav-toggler d-md-block ${
                isFixed ? 'active-menu' : ''
              }`}
              onClick={toggleFixedSidebar}>
              <div className="sidenav-toggler-inner">
                <i className="sidenav-toggler-line"></i>
                <i className="sidenav-toggler-line"></i>
                <i className="sidenav-toggler-line"></i>
              </div>
            </div>
            <i className="sidenav-close" onClick={handleCloseSidebar}>
              <BiX size="24px" />
            </i>
          </header>
          <Scrollbar className="scrollbar" margin={3}>
            <ul className="sidebar-list">
              {items
                .filter(item => item.priority)
                .map(function (item) {
                  return renderMenu(item, 1)
                })}
              <hr />
              {items
                .filter(item => item.priority === false)
                .map(item => {
                  return (
                    <li key={item.id}>
                      <ActiveLink href={item.link}>
                        <a href={item.link} className="sidebar-link">
                          {item.icon}
                          <span>{item.name}</span>
                        </a>
                      </ActiveLink>
                    </li>
                  )
                })}
            </ul>
          </Scrollbar>
        </div>
      </div>
    </SidebarStyles>
  )
}

const SidebarListItem = ({
  selected,
  label,
  onChange,
}: SidebarListItemProps) => {
  return (
    <CheckboxStyle>
      <button
        className="checkbox btn btn-default"
        onClick={() => onChange(!selected)}
      />

      <div className="label">{label}</div>
    </CheckboxStyle>
  )
}

const SidebarList = ({
  items,
  selectedItems,
  onSidebarListChange,
}: SidebarListProps) => {
  const [state, setState] = useState(0)
  const handleChange = (itemId: string) => {
    if (selectedItems[itemId]) {
      delete selectedItems[itemId]
    } else {
      selectedItems[itemId] = []
    }
    onSidebarListChange(selectedItems)
    setState(state + 1)
  }

  const handleListChange = (itemId: string, selecteds: SidebarItem[]) => {
    selectedItems[itemId] = selecteds
    onSidebarListChange(selectedItems)
  }

  return (
    <>
      {items.map(item => (
        <ul key={item.id}>
          <SidebarListItem
            selected={selectedItems[item.id]}
            label={item.name}
            onChange={() => {
              handleChange(item.id)
            }}
          />
          {item.items && selectedItems[item.id] && (
            <SidebarList
              items={item.items}
              selectedItems={selectedItems[item.id]}
              onSidebarListChange={subSelected =>
                handleListChange(item.id, subSelected)
              }
            />
          )}
          {state}
        </ul>
      ))}
    </>
  )
}

export default Sidebar
