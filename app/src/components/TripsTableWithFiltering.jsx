import React from "react";
import { render } from "react-dom";
import matchSorter from "match-sorter";
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import { Container } from "reactstrap";

export default class TripsTable extends React.Component {
  render() {
    const endedTrips = this.props.data.filter(trip => !trip.inProgress);
    const tripsToDisplay = endedTrips.map(trip => ({
      vehicle: trip.vehicle
        ? `${trip.vehicle.year} ${trip.vehicle.make} ${trip.vehicle.model}`
        : "",
      miles: trip.milesOfDepreciation,
      cost: `$${trip.depreciationCost ? trip.depreciationCost.toFixed(2) : 0}`,
      start: moment(trip.startDate).format("lll"),
      end: moment(trip.endDate).format("lll")
    }));

    const allVehicleStrings = tripsToDisplay.map(trip => trip.vehicle);
    const uniqueVehicleStrings = new Array(...new Set(allVehicleStrings));

    return (
      <Container>
        <h1 style={{ marginBottom: 16, marginTop: 16 }}>All Trips</h1>
        <ReactTable
          data={tripsToDisplay}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              Header: "Vehicle",
              accessor: "vehicle",
              id: "vehicle",
              filterMethod: (filter, row) => {
                if (filter.value === "all") {
                  return true;
                }
                return row["vehicle"] === filter.value;
              },
              Filter: ({ filter, onChange }) => {
                return (
                  <select
                    onChange={event => onChange(event.target.value)}
                    style={{ width: "100%" }}
                    value={filter ? filter.value : "all"}
                  >
                    <option value="all">all</option>
                    {uniqueVehicleStrings.map(string => (
                      <option value={string}>{string}</option>
                    ))}
                  </select>
                );
              }
            },
            {
              Header: "Cost of Depreciation",
              accessor: "cost"
            },
            {
              Header: "Miles Driven",
              accessor: "miles"
            },
            {
              Header: "Start Date",
              accessor: "start"
            },
            {
              Header: "End Date",
              accessor: "end"
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </Container>
    );
  }
}
