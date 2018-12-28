import React from 'react';
let candidates = [
  {
    name: "Maurine Fisch",
    role: "Sales",
    connected: "2015-12-01",
    status: "Hire",
    id: 0
  },
  {
    name: "Caleb Smith",
    role: "Engineer",
    connected: "2018-10-17",
    status: "Hire",
    id: 1
  },
  {
    name: "Ava Greer",
    role: "Manager",
    connected: "2018-10-15",
    status: "Hire",
    id: 2
  },
  {
    name: "Nathan Poppins",
    role: "Engineer",
    connected: "2018-10-11",
    status: "Explored",
    id: 3
  },
  {
    name: "Donald Dipson",
    role: "Engineer",
    connected: "2018-07-11",
    status: "Explored",
    id: 4
  },
  {
    name: "Shannon Rodriguez",
    role: "Customer Support",
    connected: "2018-09-11",
    status: "Scheduled",
    id: 5
  },
  {
    name: "Aaron Goldsmith",
    role: "Engineer",
    connected: "2018-12-11",
    status: "Screen",
    id: 6
  },
  {
    name: "Sean Tiburon",
    role: "Sales",
    connected: "2018-12-09",
    status: "Screen",
    id: 7
  },
  {
    name: "Sarah Henderson",
    role: "Engineer",
    connected: "2018-10-15",
    status: "Screen",
    id: 8
  },
  {
    name: "William Goldberg",
    role: "Manager",
    connected: "2018-11-11",
    status: "Screen",
    id: 9
  }
];

const DropDownHire = props => {
  return (
    <td className="dropdown">
      <span className="dropdown-toggle" data-toggle="dropdown">
        {props.children}&nbsp;
      </span>
      <ul onChange={props.updateStatus} className="dropdown-menu">
        <li>
          <button data={props.id} href="#">
            Screen
          </button>
        </li>
        <li>
          <button data={props.id} href="#">
            Scheduled
          </button>
        </li>
        <li>
          <button data={props.id} href="#">
            Explored
          </button>
        </li>
        <li>
          <button data={props.id} href="#">
            Hire
          </button>
        </li>
      </ul>
    </td>
  );
};

export default class CandidateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: candidates
    };
  }
  update = (currentData, unique, _status) => {
    var results = [];
    for (let candidate of currentData) {
      if (candidate.id === unique) {
        candidate.status = _status;
      }
      results.push(candidate);
    }
    return results;
  };
  search = (str, group) => {
    let results = [];
    for (var candidate of group) {
      if (
        candidate.name.includes(str) ||
        candidate.role.includes(str) ||
        candidate.connected.includes(str) ||
        candidate.status.includes(str)
      ) {
        results.push(candidate);
      }
    }
    return results;
  };
  chooseStatus = event => {
    let status = event.target.innerHTML;
    let copy = JSON.parse(JSON.stringify(candidates));
    candidates = this.update(copy, event.target.data, status);
    this.setState({ results: candidates });
  };
  handleInput = event => {
    let str = event.target.value.trim();
    if (str.toLowerCase().indexOf(" or ") >= 0) {
      let Oparts = str.split(" or ");
      let arr = this.search(Oparts[0], candidates).concat(
        this.search(Oparts[1], candidates)
      );
      this.setState({ results: arr });
    } else if (str.toLowerCase().indexOf(" and ") >= 0) {
      let Aparts = str.split(" and ");
      let groupA = this.search(Aparts[0], candidates);
      let groupB = this.search(Aparts[1], groupA);
      console.log(this.search(Aparts[0], groupB));

      this.setState({ results: this.search(Aparts[0], groupB) }); // exclusively search from groupA
    } else {
      this.setState({ results: this.search(str, candidates) });
    }
  };
  handleReset = () => {
    document.getElementById('inputQ').text = "";
    // $("#inputQ").val("");
    this.setState({ results: candidates });
  };

  render() {
    return (
      <div>
        <div id="query">
          <input type="text" onChange={this.handleInput} id="inputQ" />
          <div id="reset" onClick={this.handleReset}>
            RESET
          </div>
        </div>
        <table>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Connected On</th>
            <th>Status</th>
          </tr>
          <tbody>
          {this.state.results.map(candidate => (
            <tr>
              <td>{candidate.name}</td>
              <td>{candidate.role}</td>
              <td>{candidate.connected}</td>
              <DropDownHire id={candidate.id} updateStatus={this.chooseStatus}>
                {candidate.status}
              </DropDownHire>
            </tr>
          ))}
          </tbody>
        </table>

        <div />
      </div>
    );
  }
}