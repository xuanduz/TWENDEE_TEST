import { useState } from "react"
import { UserDataTypes } from "../pages/UsersPage"


export interface PaginationNavProps {
  onChangePage: Function
}

export const PaginationNav = (props: PaginationNavProps) => {
  const { onChangePage } = props
  const pageList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handleSelectPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    onChangePage(pageNumber)
  }

  const handleToPreviousPage = () => {
    handleSelectPage(currentPage - 1)
  }
  
  const handleToNextPage = () => {
    handleSelectPage(currentPage + 1)
  }

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {
            currentPage != 1 
            ? <li className="page-item" role={'button'} onClick={handleToPreviousPage}>
                <p className="page-link">
                  <span aria-hidden="true">&laquo;</span>
                </p>
              </li>
            : null
          }
          {
            pageList.map((page: number, index: number) => (
              <li 
                key={'page-' + index}
                role="button" 
                onClick={() => handleSelectPage(page)}
                className={`page-item ${page == currentPage ? 'active' : ''}`} 
              >
                <p className="page-link">{page}</p>
              </li>
            ))
          }
          {
            currentPage != pageList[pageList.length - 1]
            ? <li className="page-item" role={'button'} onClick={handleToNextPage}>
                <p className="page-link">
                  <span aria-hidden="true">&raquo;</span>
                </p>
              </li>
            : null
          }
        </ul>
      </nav>
    </>
  )
}

export default PaginationNav