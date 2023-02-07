import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import Bbb from "./Bbb";
import FetchBox from "./components/FetchBox";


const ReactGridLayout = WidthProvider(RGL);

const a = [<Bbb></Bbb>,"2","3","4","77"];

export default class GridLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 5,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12
  };

  

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  
  

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: 20,
        y: Math.floor(i / 6) * y,
        w: 10,
        h: 10,

      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }



  generateDOM() {
    return a.map( (i) => {
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}
