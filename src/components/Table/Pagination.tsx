import ArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import { MenuItem, Select } from '@material-ui/core'
import { IconButton } from '@material-ui/core'

const Pagination = ({
    previousPage,
    canPreviousPage,
    pageIndex,
    pageOptions,
    canNextPage,
    nextPage,
    pageSize,
    setPageSize,
}) => {
    return (
        <div className="h-20 flex justify-end items-center mx-10">
            <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="mx-3"
            >
                {
                    <IconButton color="primary">
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                }
            </button>{' '}
            <span>
                Página{' '}
                <strong>
                    {pageIndex + 1} de {pageOptions.length}
                </strong>{' '}
            </span>
            <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="mx-3"
            >
                {
                    <IconButton color="primary">
                        <ArrowRightOutlinedIcon />
                    </IconButton>
                }
            </button>{' '}
            <Select
                className="rounded-xl bg-transparent hidden"
                value={pageSize}
                onChange={(e) => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <MenuItem key={pageSize} value={pageSize}>
                        Mostrar {pageSize}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}

export default Pagination
