import React, {Component} from "react";
import {View, Text} from "react-native";
import styles from "./styles.js";

class DummyGrid extends Component<{}> {
  _renderGrid = () => {
    let renderGrid = [];
    const grid = this.props.grid;

    if (grid.length !== 0) {
      for (let i = 0; i < grid.length; i += 1) {
        // Go through the columns
        const currentColumn = grid[i];
        let renderColumn = [];
        for (let j = 0; j < currentColumn.length; j += 1) {
          // Go through the cells and push white views if the cell is alive and black otherwise
          const cell = currentColumn[j];
          renderColumn.push(
            <View
              key={j}
              style={[
                {backgroundColor: cell ? "#FFFFFF" : "#000000"},
                styles.cell
              ]}
            />
          );
        }
        // Push columns to the grid view
        renderGrid.push(
          <View style={{flexDirection: "row"}} key={i}>
            {renderColumn}
          </View>
        );
      }
    }
    return renderGrid;
  };

  render() {
    return (
      <View style={styles.gridContainer}>
        {/* <Text>{`GENERATION: ${this.props.step}`}</Text>
        <Text>{`POPULATION: ${this.props.population}`}</Text>
        {this._renderGrid()} */}
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>
            This is a React Native snapshot test.
          </Text>
        </View>
      </View>
    );
  }
}

export default DummyGrid;
