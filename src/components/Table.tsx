import { useEffect, useState } from "react"
import { defaultPageInfo } from "../atom/User.atom"
import { ColumnTypes, DataFields, UserDataTypes } from "../pages/UsersPage"
import PaginationNav from "./PaginationNav"
import '../styles/table.css'

export interface TableProps {
  columns?: ColumnTypes[]
  data: UserDataTypes[]
  setDataUserTable: Function
}

export const Table = (props: TableProps) => {
  const { columns, data, setDataUserTable } = props
  const [listUsers, setListUsers] = useState<UserDataTypes[]>([])
  const [sortOrder, setSortOrder] = useState<boolean>(false)

  useEffect(() => {
    setListUsers(data)
  }, [data])

  const handleSort = (dataField: string) => {
    let sortedListUsers = [...listUsers]
    if (dataField == DataFields.FULLNAME) {
      if (!sortOrder) {
        sortedListUsers?.sort((a, b) => a.name.first.localeCompare(b.name.first))
      } else {
        sortedListUsers?.sort((a, b) => -a.name.first.localeCompare(b.name.first))
      }
    }
    else {
      if (dataField == DataFields.USERNAME) {
        if (!sortOrder) {
          sortedListUsers?.sort((a, b) => a.login.username.localeCompare(b.login.username))
        } else {
          sortedListUsers?.sort((a, b) => -a.login.username.localeCompare(b.login.username))
        }
      }
    }
    setListUsers(sortedListUsers)
    setSortOrder((current) => !current)
  }

  const handleChangePage = (pageNumber: number) => {
    setDataUserTable({
      ...defaultPageInfo,
      page: pageNumber
    })
  }

  return (
    <div>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            { 
              columns?.map((column: ColumnTypes, index: number) => (
                <th scope="col" key={`table-header-${index}`}>
                  <span className="me-2">{column.label}</span>
                  { 
                    column.sort 
                    ? <span style={{fontWeight: 100, cursor: 'pointer'}} onClick={() => handleSort(column.dataField)}>&#10607;</span> 
                    : null
                  }
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            listUsers?.map((user: UserDataTypes, index: number) => (
              <tr key={`table-body-${index}`} className={'table-body-row'}>
                <td>
                  <p>{`${user?.name?.title} ${user?.name?.first} ${user?.name?.last}`}</p>
                </td>
                <td>
                  <p>{user?.login?.username}</p>
                </td>
                <td>
                  <img src={user?.picture?.thumbnail || ''} alt="user" />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="pagination justify-content-center">
        <PaginationNav onChangePage={handleChangePage} />
      </div>
    </div>
  )
}

export default Table