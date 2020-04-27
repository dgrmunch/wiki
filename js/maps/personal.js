$(document).ready(function() {

  sleep(1000).then(() => {

     
    $(function() {
      
      var americaMap = new Datamap({
        element: document.getElementById('personalMap'),
        fills: {
          defaultFill: '#f2f2f2',
          highlightFillColor: 'lightgray',
          visited: 'black'
        },
        responsive: true,
        geographyConfig: {
          hideAntarctica: true,
          borderWidth: 1,
          borderOpacity: 1,
          borderColor: '#fff',
          popupOnHover: true,
          highlightOnHover: true,
          highlightFillColor: function(data) {
            if (data.fillKey) {
              return '#90a2b5';
            }
            return '#dbdbdb';
          },
          highlightBorderColor: '#fff',
          popupTemplate: function(geo, data) {
            // don't show tooltip if country don't present in dataset
            if (!data) {
              return ['',
                    '<div class ="hoverinfo">' + geo.properties.name, ''
                  ].join('');
            }
            // tooltip content
            return ['',
                    '<div class ="hoverinfo">' + geo.properties.name + ''
                  ].join('');
          },
          data: { 
        }
        },
        scope: 'world',  
        projection: 'mercator',
        data: {  

          ESP: {fillKey: 'visited'},
          MAR: {fillKey: 'visited'},
          SEN: {fillKey: 'visited'},
          FRA: {fillKey: 'visited'},
          BRA: {fillKey: 'visited'},
          CAN: {fillKey: 'visited'},
          USA: {fillKey: 'visited'},
          ITA: {fillKey: 'visited'},
          GBR: {fillKey: 'visited'},
          IRL: {fillKey: 'visited'},
          BOL: {fillKey: 'visited'},
          PER: {fillKey: 'visited'},

          NOR: {fillKey: 'visited'},
          DEU: {fillKey: 'visited'},
          NLD: {fillKey: 'visited'},
          CHE: {fillKey: 'visited'},
          BGR: {fillKey: 'visited'},
          GRC: {fillKey: 'visited'},
          MKD: {fillKey: 'visited'},
          BIH: {fillKey: 'visited'},
          HRV: {fillKey: 'visited'},
          HUN: {fillKey: 'visited'},
          POL: {fillKey: 'visited'},
          SVN: {fillKey: 'visited'},
          MNE: {fillKey: 'visited'},
          SVK: {fillKey: 'visited'},
          AUT: {fillKey: 'visited'},
          CZE: {fillKey: 'visited'},
          BEL: {fillKey: 'visited'}
          
      }
      });

      americaMap.bubbles([
        {name: 'Puerto Rico', latitude: 18.2076699, longitude: -67.1463162, radius: 3, fillKey: 'visited'}
       ], {
        popupTemplate: function(geo, data) {
          return "<div class='hoverinfo'>"+ data.name + "";
        }
       });

});

    $(function() {
      ;
            var USAmap = new Datamap({
              element: document.getElementById('personalMapUSA'),
              fills: {
                defaultFill: '#f2f2f2',
                highlightFillColor: 'lightgray',
                visited: 'black'
              },
              responsive: true,
              geographyConfig: {
                hideAntarctica: true,
                borderWidth: 1,
                borderOpacity: 1,
                borderColor: '#fff',
                popupOnHover: true,
                highlightOnHover: true,
                highlightFillColor: function(data) {
                  if (data.fillKey) {
                    return '#90a2b5';
                  }
                  return '#dbdbdb';
                },
                highlightBorderColor: '#fff',
                popupTemplate: function(geo, data) {
                  // don't show tooltip if country don't present in dataset
                  if (!data) {
                    return ['',
                          '<div class ="hoverinfo">' + geo.properties.name, ''
                        ].join('');
                  }
                  // tooltip content
                  return ['',
                          '<div class ="hoverinfo">' + geo.properties.name + ''
                        ].join('');
                },
                data: { 
              }
              },
              scope: 'usa',
              data: {  
                SC: {fillKey: 'visited'},
                NC: {fillKey: 'visited' },
                TX: {fillKey: 'visited' },
                CO: {fillKey: 'visited' },
                LA: {fillKey: 'visited' },
                NY: {fillKey: 'visited' },
                IN: {fillKey: 'visited' },
                KY: {fillKey: 'visited' },
                IL: {fillKey: 'visited' },
                TN: {fillKey: 'visited' },
                VA: {fillKey: 'visited' },
                WV: {fillKey: 'visited' },
                MA: {fillKey: 'visited' },
                DC: {fillKey: 'visited' },
                CT: {fillKey: 'visited' },
                PA: {fillKey: 'visited' },
                DE: {fillKey: 'visited' },
                MD: {fillKey: 'visited' },
                NJ: {fillKey: 'visited' },
                GA: {fillKey: 'visited' },
                FL: {fillKey: 'visited' },
                NM: {fillKey: 'visited' },
                PR: {fillKey: 'visited' },
                OH: {fillKey: 'visited' },
                AZ: {fillKey: 'visited' },
                MI: {fillKey: 'visited' },
                RI: {fillKey: 'visited' },
                OR: {fillKey: 'visited' },
                WA: {fillKey: 'visited' },
                WI: {fillKey: 'visited' },
                MN: {fillKey: 'visited' },
                MS: {fillKey: 'visited' },
                CA: {fillKey: 'visited' },
                AL: {fillKey: 'visited' }
            }
            });
      
    });

  });


});