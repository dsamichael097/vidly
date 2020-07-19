import React, { Component } from "react";
//import Like from "./like";
import _ from "lodash";
import PropTypes from "prop-types";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  render() {
    const { data, columns, valueProperty } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item[valueProperty]}>
            {columns.map((column) => (
              <td key={item[valueProperty] + (column.path || column.key)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    valueProperty: PropTypes.string,
  };

  static defaultProps = {
    valueProperty: "_id",
  };
}

export default TableBody;
