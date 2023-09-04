import React from 'react';
import {VizelFromCfg} from 'bi-internal/ui';

class Root extends React.Component {
    public schemaName: string;

    public vizelCfgs = [
        {
            frame: {
              h: 8,
              w: 2,
              x: 0,
              y: 0,
            },
            dataSource: {
              koob: 'postrges.control_zsp_c_gr1_v02',
              xAxis: 'zsp_vnsi;zsp_vers;zsp_form;zsp_time',
              yAxis: 'measures',
              dimensions: [
                'zsp_vnsi',
                'zsp_vers',
                'zsp_form',
                'zsp_time',
              ],
            },
            view_class: 'VizelKoobControl',
            title: '',
          }
    ]

    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
    }
    componentWillUnmount(): void {
    }
    public render() {
      let baseWidth = 0;
      let baseHeight = 0;
  
      this.vizelCfgs.map(cfg => {
        const currentWidth = cfg.frame.x + cfg.frame.w;
        const currentHeight = cfg.frame.y + cfg.frame.h;
  
        if (currentWidth >= baseWidth) {
          baseWidth = currentWidth
        }
        if (currentHeight >= baseHeight) {
          baseHeight = currentHeight
        }
      });

  //  console.log(baseHeight, baseWidth)
      return (      
        <div className="GridContainer" style={{width: "100%", height: "100%", position: "absolute"}}>
          {this.vizelCfgs.map(cfg =>
            <div className={'GridContainer__Item'} style={{position: "absolute",
              left: `${Math.ceil(cfg.frame.x * 100/ baseWidth)}vw`,
              top: `${Math.ceil(cfg.frame.y * 100/ baseHeight)}vh`,
              width: `${Math.ceil(cfg.frame.w * 100/ baseWidth)}vw`,
              height: `${Math.ceil(cfg.frame.h * 100/ baseHeight)}vh`,
              padding: "0.5vmin"
            }}>
              <VizelFromCfg schema_name={'ds_24'} rawCfg={cfg} onVizelPropertiesChanged={() => {}}/>
            </div>
          )}
        </div>
      );
    }
  }
  
  export default Root;