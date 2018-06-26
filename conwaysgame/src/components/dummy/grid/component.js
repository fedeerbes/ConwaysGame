import React, {Component} from "react";
import {View, Text} from "react-native"
import styles from "./styles.js";

class DummyGrid extends Component<{}> {

  _renderGrid = () => {
    let renderGrid = [],
        grid = this.props.grid;

        if (grid.length !== 0) {
          grid.map((column, index) => {
            let columnArray = [];
            column.map((cell, innerIndex) => {
              columnArray.push(<View key={innerIndex} style={[{backgroundColor: cell ? "#FFFFFF" : "#000000"}, styles.cell]}></View>)
            })
  
            renderGrid.push(
              <View style={{flexDirection: "row"}} key={index}>
                {columnArray}
              </View>
            )
          })
        }
    return renderGrid;
  }

  render() {
    return (
      <View style={styles.gridContainer}>
        <Text>{`GENERATION: ${this.props.step}`}</Text>
        <Text>{`POPULATION: ${this.props.population}`}</Text>
        {this._renderGrid()}
      </View>
    );
  }
}

export default DummyGrid;
