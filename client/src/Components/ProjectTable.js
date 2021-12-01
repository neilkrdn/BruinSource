import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ProjectTable.css'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import history from '../history';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



export default function ProjectTable(props) {

  // must parse input data

  const { data } = props;

  const renderTableRows = () => {
    return data.map((project, index) => {
      const { id, name, description, tags, date_created, last_updated, author, collaborators, requests, username, project_id } = project


      var d = new Date(date_created)
      d = d.toDateString()

      var collaboratorsExist = false
      if (collaborators && collaborators.length) {
        if (collaborators.length > 0) {
          collaboratorsExist = true
        }
      }

      const onClickFunction = () => {
        console.log(project_id)
        history.push('/createtask', [project_id])
      }

      return (
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {project.name}
          </TableCell>
          <TableCell align="right">{project.username}</TableCell>
          <TableCell align="right">{d}</TableCell>
          <TableCell align="right">{collaboratorsExist ? collaborators : 'No collaborators'}</TableCell>
          <TableCell align="right" color="secondary"><Button onClick={onClickFunction}>View</Button></TableCell>
        </TableRow>);
    })
  }

  return (
    <div className="ProjectTableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6" color="inherit" className="flex">Project Name</Typography></TableCell>
              <TableCell align="right"><Typography variant="h6" color="inherit" className="flex">Author</Typography></TableCell>
              <TableCell align="right"><Typography variant="h6" color="inherit" className="flex">Date Created</Typography></TableCell>
              <TableCell align="right"><Typography variant="h6" color="inherit" className="flex">Collaborators</Typography></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
