import { LatLngExpression, LatLngLiteral } from "leaflet";

interface IMapData {
  pathCoords: LatLngExpression[];
  progressCoords: LatLngExpression[];

  totalPathColor: string;
  progressPathColor: string;
}

class MapData implements IMapData {
  pathCoords: LatLngExpression[] = pathCoordinates;
  progressCoords: LatLngExpression[];
  totalPathColor: string = 'rgb(169, 185, 245, 0.5)';
  progressPathColor: string = 'rgb(84, 118, 247, 0.95)';
  markerColor: string = 'rgb(0,0,0, 1)';
  markerFillColor: string = 'rgb(153, 5, 0, 1)';

  constructor(progressPercent: number) {
    this.progressCoords = this.getPathProgress(progressPercent);
  }

  get progressPoint(): LatLngExpression {
    return this.progressCoords.at(-1) as LatLngExpression;
  }

  // percentage will be 0-100
  getPathProgress(percentage: number) {
    console.log(percentage);
    let {progressPoint, index} = this.getPathProgressPoint(percentage)

    let progressLine = this.pathCoords.slice(0, index);

    let pathProgress = [...progressLine, progressPoint] as LatLngExpression[];

    // console.log(pathProgress);
    // console.log(this.pathCoords);

    return pathProgress;
  }

  getPathProgressPoint(percentage: number) {
    let totDist = 0;
    let cumDist = [0]

    for (var i = 1; i < this.pathCoords.length; i++) {
      totDist += this.distanceTo(this.pathCoords[i-1] as number[], this.pathCoords[i] as number[]);
      cumDist.push(totDist);     
    }
    
    let targDist = totDist * percentage;

    for (let i = 1; i < cumDist.length; i++) {
      if (targDist <= cumDist[i]) {
        let segDist = cumDist[i] - cumDist[i - 1];
        let segPercent = (targDist - cumDist[i - 1]) / segDist;
        let latlngA = this.pathCoords[i - 1] as number[];
        let latlngB = this.pathCoords[i] as number[];   
        let interpolatedLat = latlngA[0] + (segPercent * (latlngB[0] - latlngA[0]));
        let interpolatedLng = latlngA[1] + (segPercent * (latlngB[1] - latlngA[1]));
        return {
          progressPoint: [interpolatedLat, interpolatedLng],
          index: i
        };
      }
    }

    return {
      progressPoint: this.pathCoords[this.pathCoords.length - 1],
      index: this.pathCoords.length - 1
    }
  }

  private distanceTo(p1: number[], p2: number[]) {
    let a = Math.pow((p2[0] - p1[0]), 2);
    let b = Math.pow((p2[1] - p1[1]), 2);
    let dist = Math.sqrt(a + b);

    // console.log(p1, p2, a, b, dist);
    
    return dist;
  }
}

const pathCoordinates: LatLngExpression[] = [
  [1739, 821],
  [1726, 837],
  [1729, 850],
  [1735, 864],
  [1742, 880],
  [1749, 894],
  [1753, 913],
  [1755, 932],
  [1757, 944],
  [1759, 964],
  [1760, 980],
  [1760, 1000],
  [1754, 1015],
  [1741, 1025],
  [1730, 1030],
  [1726, 1034],
  
  [1728, 1055],
  [1735, 1082],
  [1733, 1120],
  [1731, 1159],
  [1733, 1201],
  [1741, 1231],
  [1747, 1247],
  [1758, 1275],
  [1769, 1307],
  [1771, 1340],
  [1768, 1364],
  [1764, 1392],
  [1757, 1412],
  [1752, 1449],
  [1748, 1486],
  [1745, 1510],
  [1742, 1529],
  [1754, 1554],
  [1753, 1581],
  [1741, 1594],
  [1724, 1598],
  [1700, 1597],
  [1677, 1590],
  [1663, 1569],
  [1643, 1562],
  [1629, 1567],
  [1614, 1559],
  [1600, 1544],

  [1596, 1531],
  [1594, 1517],
  [1584, 1514],
  [1574, 1513],
  [1562, 1522],
  [1549, 1527],
  [1540, 1527],
  [1527, 1515],
  [1519, 1507],
  [1508, 1510],
  [1490, 1512],
  [1486, 1497],
  [1477, 1489],
  [1468, 1497],
  [1462, 1513],
  [1460, 1535],
  [1450, 1555],
  [1445, 1575],
  [1437, 1589],
  [1424, 1598],
  [1419, 1615],
  [1411, 1622],
  [1408, 1632],
  [1398, 1633],
  [1388, 1636],
  [1383, 1650],
  [1380, 1664],
  [1373, 1675],
  [1373, 1689],
  [1373, 1700],
  [1370, 1711],
  [1358, 1714],
  [1348, 1720],
  [1337, 1721],
  [1325, 1729],
  [1315, 1745],
  [1306, 1764],
  [1294, 1779],
  [1283, 1790],
  [1277, 1807],
  [1274, 1817],
  [1269, 1831],
  [1257, 1833],
  
  [1247, 1827],
  [1233, 1819],
  [1221, 1816],
  [1207, 1819],
  [1201, 1828],
  [1198, 1840],
  [1202, 1855],
  [1207, 1865],
  [1211, 1874],
  [1207, 1881],
  [1195, 1885],
  [1185, 1888],
  [1178, 1881],
  [1176, 1873],
  [1166, 1862],
  [1156, 1853],
  [1144, 1854],
  [1136, 1862],
  [1131, 1878],
  [1123, 1887],
  [1115, 1889],
  [1105, 1890],
  [1093, 1893],
  [1081, 1889],
  [1070, 1881],
  [1058, 1875],
  [1047, 1871],
  [1032, 1872],
  [1022, 1874],
  
  [1008, 1876],
  [995, 1881],
  [981, 1888],
  [969, 1895],
  [949, 1898],
  [950, 1910],
  [961, 1922],
  [974, 1932],
  [988, 1936],
  [994, 1946],
  [1000, 1952],
  [1009, 1951],
  [1016, 1956],
  [1020, 1970],
  [1016, 1979],
  [1005, 1984],
  [997, 1983],
  [990, 1980],
  [978, 1984],
  [958, 1992],
  [944, 2002],
  [926, 2012],

  [915, 2028],
  [910, 2049],
  [909, 2070],
  [909, 2093],
  [916, 2110],
  [923, 2129],
  [932, 2144],
  [936, 2151],
  [937, 2131],
  [934, 2113],
  [923, 2104],
  [906, 2098],
  [882, 2098],
  [875, 2099],

  [845, 2100],
  [814, 2103],
  [781, 2106],
  [748, 2104],
  [735, 2104],
  [727, 2108],
  [721, 2125],
  [740, 2137],
  [751, 2151],
  [761, 2168],
  [771, 2182],
  [773, 2203],
  [771, 2225],
  [777, 2243],
  [787, 2251],
  [789, 2264]
]

export default MapData;