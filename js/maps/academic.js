$(document).ready(function() {


  sleep(500).then(() => {
    
    var map = new Datamap({
      scope: 'world',
      element: document.getElementById('academicMap'),
      projection: 'mercator',
      fills: {
        defaultFill: '#f2f2f2',
        highlightFillColor: 'lightgray',
        visited: 'rgb(65, 65, 65)'
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
            return;
          }
          // tooltip content
          return ['',
                  '<div class ="hoverinfo">' + geo.properties.name, ''
                ].join('');
        }
      },

      
      data: {
        USA: {fillKey: 'visited' },
        CAN: {fillKey: 'visited' },
        BOL: {fillKey: 'visited' },
        SEN: {fillKey: 'visited'},
        ESP: {fillKey: 'visited' }   
      }
    })
    
    map.arc([
     {
      origin: {
          latitude: 40.4378698,
          longitude: -3.8196188
      },
      destination: {
          latitude: 36.1002391,
          longitude: -79.903418,
      }, 
      options: {
        strokeWidth: 2, 
        strokeColor: '#90a2b5'
      }
    },
    {
       origin: {
          latitude: 40.4378698,
          longitude: -3.8196188
      },
      destination: {
          latitude: 43.7181557,
          longitude: -79.5181398,
      }, 
      options: {
        strokeWidth: 2, 
        strokeColor: '#90a2b5'
      }
    },
    {
       origin: {
          latitude: 40.4378698,
          longitude: -3.8196188
      },
      destination: {
          latitude: 14.4762731,
          longitude: -15.6380748,
      }, 
      options: {
        strokeWidth: 2, 
        strokeColor: '#90a2b5'
      }
    },
    {
       origin: {
          latitude: 40.4378698,
          longitude: -3.8196188
      },
      destination: {
          latitude: -16.2362769,
          longitude: -68.0437371
      }, 
      options: {
        strokeWidth: 2, 
        strokeColor: '#90a2b5'
      }
    },
    ], {strokeWidth: 2});

    console.log(1);
  });


});