import React, { useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Icon, TableContainer } from '@material-ui/core'



const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    tableWrapper: {
        maxHeight: 1000,
        overflow: 'auto'
    }
})

const DataTable = (props) => {
    const {
        columns,
        dataRows,
        pagination
    } = props

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const classes = useStyles()

    const changePage = (event, newPage) => {
        setPage(newPage)
    }

    const changeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Paper
            className={classes.root}
            elevation={3}
        >
            <div className={classes.tableWrapper}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader >
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map((column, key) => {
                                        return (
                                            <TableCell
                                                style={{
                                                    backgroundColor: '#bbdefb',
                                                    fontWeight: 'bold',
                                                    whiteSpace: 'nowrap'
                                                }}
                                                key={key}
                                                align='center'
                                                size='small'
                                            >
                                                {column.label}
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ overflow: 'auto' }}>
                            {
                                dataRows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, key) => {
                                        return (
                                            <TableRow hover role='checkboxes' tabIndex={-1} key={key}>
                                                {
                                                    columns.map((column, key) => {
                                                        const value = row[column.id]
                                                        return (
                                                            column.type === 'text'
                                                                ?
                                                                <TableCell style={{ whiteSpace: 'nowrap' }} size='small' key={key} align={columns.length === 1 ? 'left' : 'center'}>
                                                                    {value}
                                                                </TableCell>
                                                                :
                                                                column.type === 'action'
                                                                    ?
                                                                    <TableCell size='small' key={key} align='center'>
                                                                        <Icon onClick={() => column.event(row)}>{column.icon}</Icon>
                                                                    </TableCell>
                                                                    :
                                                                    <TableCell size='small' key={key} align='center'>
                                                                        {column.event(row)}
                                                                    </TableCell>

                                                        )
                                                    })
                                                }
                                            </TableRow>
                                        )
                                    })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {pagination !== "false"
                ?
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
                    labelRowsPerPage="Registros por pagina:"
                    component="div"
                    count={dataRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={changePage}
                    onChangeRowsPerPage={changeRowsPerPage}
                />
                :
                <></>
            }
        </Paper>
    )
}

export default DataTable