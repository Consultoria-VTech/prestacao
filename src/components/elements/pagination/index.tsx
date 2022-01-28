import React, { useEffect, useState } from 'react'
import { CSSProperties } from 'styled-components'
import { PaginationStyled } from './styles'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from
  const range = []

  while (i <= to) {
    range.push(i)
    i += step
  }

  return range
}

type PaginationProps = {
  totalRecords: number
  pageLimit?: number
  pageNeighbours?: number
  onPageChanged: (f) => void
  currentPage: number
  style?: CSSProperties
}

const Pagination: React.FC<PaginationProps> = props => {
  const [totalRecords, setTotalRecords] = useState(null)
  const [pageLimit, setPageLimit] = useState(30)
  const [pageNeighbours, setPageNeighbours] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props
    setPageLimit(typeof pageLimit === 'number' ? pageLimit : 30)
    setTotalRecords(typeof totalRecords === 'number' ? totalRecords : 0)
    setPageNeighbours(
      typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0
    )

    setTotalPages(totalRecords / pageLimit)
    setCurrentPage(props.currentPage)
  }, [props])

  useEffect(() => {
    gotoPage(1)
  }, [])

  const gotoPage = page => {
    const { onPageChanged = f => f } = props

    const currentPage = Math.max(0, Math.min(page, totalPages))

    const paginationData = {
      currentPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords,
    }

    // setCurrentPage(currentPage)
    onPageChanged(paginationData)
  }

  const handleClick = page => evt => {
    evt.preventDefault()
    gotoPage(page)
  }

  const handleMoveLeft = evt => {
    evt.preventDefault()
    gotoPage(currentPage - pageNeighbours * 2 - 1)
  }

  const handleMoveRight = evt => {
    evt.preventDefault()
    gotoPage(currentPage + pageNeighbours * 2 + 1)
  }

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)

      let pages = range(startPage, endPage)

      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]
    }

    return range(1, totalPages)
  }

  if (!totalRecords || totalPages === 1) return null

  const pages = fetchPageNumbers()

  return (
    <PaginationStyled aria-label="Pagination" style={props?.style}>
      <ul className="pagination pagination-sm justify-content-center my-0">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <button
                  className="page-link"
                  aria-label="Previous"
                  onClick={handleMoveLeft}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </button>
              </li>
            )

          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <button
                  className="page-link"
                  aria-label="Next"
                  onClick={handleMoveRight}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </button>
              </li>
            )

          return (
            <li
              key={index}
              className={`page-item${currentPage === page ? ' active' : ''}`}>
              <button className="page-link" onClick={handleClick(page)}>
                {page}
              </button>
            </li>
          )
        })}
      </ul>
    </PaginationStyled>
  )
}

export default Pagination
