import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import Paper from '@mui/material/Paper'

export default function DataTable({ displayData }) {
  console.log(displayData)
  return (
    <TableContainer sx={{ mt: '2em' }} component={Paper}>
      <Table aria-label="profile and account details">
        <TableBody>
          {displayData &&
            displayData.map((entry) => {
              return (
                <TableRow key={entry.label}>
                  <TableCell>{entry.label}</TableCell>
                  <TableCell>{entry.value}</TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
