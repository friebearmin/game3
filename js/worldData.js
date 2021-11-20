// In diese Datei werden die Objekte gehalten,
// die für die Daten der Spielwelt verantwortlich sind
// Erstellt auch von Armin Friebe am 13.01.2021
var worldDataSpace = [];
function world(x,y){
    if(x == 0 && y == 0){
        return [
            new Cube(0, 0, 0),
            new Cube(1, areaSize, 0),
            new Cube(2, 2*areaSize, 0),
            new Cube(3, 3*areaSize, 0),
            new Cube(4, 4*areaSize, 0),
            new Cube(5, 5*areaSize, 0),
            new Cube(6, 6*areaSize, 0),
            new Cube(7, 7*areaSize, 0),
            new Cube(8, 8*areaSize, 0),
            new Cube(9, 9*areaSize, 0),
            new Cube(10, 10*areaSize, 0),
            new Cube(11, 11*areaSize, 0),
            new Cube(12, 12*areaSize, 0),
            new Cube(13, 13*areaSize, 0),
            new Cube(14, 14*areaSize, 0),
            new Cube(15, 0, areaSize),
            new Cube(16, 0, 2*areaSize),
            new Cube(17, 0, 3*areaSize),
            new Cube(18, 0, 4*areaSize),
            new Cube(19, 0, 5*areaSize),
            new Cube(20, areaSize*4, 6*areaSize),
            new Cube(21, 0, 7*areaSize),
            new Cube(22, 0, 8*areaSize),
            new Cube(23, 0, 9*areaSize),
            new Cube(24, 0, 10*areaSize),
            new Cube(25, 0, 11*areaSize),
            new Cube(26, 0, 12*areaSize),
            new Cube(27, 0, 13*areaSize),
            new Cube(28, 0, 14*areaSize),
            new Cube(29, areaSize*1, 14*areaSize),
            new Cube(30, areaSize*2, 3*areaSize),
            new Cube(31, areaSize*2, 4*areaSize),
            new Cube(32, areaSize*2, 5*areaSize),
            new Cube(33, areaSize*2, 6*areaSize),
            new Cube(34, areaSize*2, 7*areaSize),
            new Cube(35, areaSize*2, 8*areaSize),
            new Cube(36, areaSize*2, 9*areaSize),
            new Cube(37, areaSize*14, 14*areaSize),
            new Cube(38, areaSize*14, 1*areaSize),
            new Cube(39, areaSize*14, 2*areaSize),
            new Rock(40, areaSize*14, 7*areaSize)
        ];
    }else if(x == 0 && y == 1){
        var xAdd = x*15*areaSize;
        var yAdd = y*15*areaSize;
        return [
            new Cube(41, 5*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(42, 6*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(43, 7*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(44, 8*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(45, 9*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(46, 5*areaSize+xAdd, 13*areaSize+yAdd),
            new Cube(47, 5*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(48, 5*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(49, 9*areaSize+xAdd, 13*areaSize+yAdd),
            new Cube(50, 9*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(51, 9*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(52, 5*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(53, 6*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(54, 8*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(55, 9*areaSize+xAdd, 10*areaSize+yAdd),
            new Rock(56, 7*areaSize+xAdd, 13*areaSize+yAdd),
            new Cube(20101, 0*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(20102, 1*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(20103, 2*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(20104, 3*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(20105, 4*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(20106, 10*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(20107, 11*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(20108, 12*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(20109, 13*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(20110, 14*areaSize+xAdd, 14*areaSize+yAdd)
        ];
    }else if(x == -1 && y == 1){
        var xAdd = x*15*areaSize;
        var yAdd = y*15*areaSize;
        return [
            new Cube(57, 0*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(58, 0*areaSize+xAdd, 1*areaSize+yAdd),
            new Cube(59, 0*areaSize+xAdd, 2*areaSize+yAdd),
            new Cube(60, 0*areaSize+xAdd, 3*areaSize+yAdd),
            new Cube(61, 0*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(62, 0*areaSize+xAdd, 5*areaSize+yAdd),
            new Cube(63, 0*areaSize+xAdd, 6*areaSize+yAdd),
            new Cube(64, 0*areaSize+xAdd, 7*areaSize+yAdd),
            new Cube(65, 0*areaSize+xAdd, 8*areaSize+yAdd),
            new Cube(66, 0*areaSize+xAdd, 9*areaSize+yAdd),
            new Cube(67, 0*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(68, 0*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(69, 0*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(70, 0*areaSize+xAdd, 13*areaSize+yAdd),
            new Cube(71, 0*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31101, 1*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31102, 2*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31103, 3*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31104, 4*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31105, 5*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31106, 6*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31107, 7*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31108, 8*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31109, 9*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31110, 10*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31111, 11*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31112, 12*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31113, 13*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31114, 14*areaSize+xAdd, 14*areaSize+yAdd)
        ];
    }else if(x == -1 && y == 0){
        var xAdd = x*15*areaSize;
        var yAdd = y*15*areaSize;
        return [
            new Cube(31145, 0*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31146, 0*areaSize+xAdd, 1*areaSize+yAdd),
            new Cube(31147, 0*areaSize+xAdd, 2*areaSize+yAdd),
            new Cube(31148, 0*areaSize+xAdd, 3*areaSize+yAdd),
            new Cube(31149, 0*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(31150, 0*areaSize+xAdd, 5*areaSize+yAdd),
            new Cube(31151, 0*areaSize+xAdd, 6*areaSize+yAdd),
            new Cube(31152, 0*areaSize+xAdd, 7*areaSize+yAdd),
            new Cube(31153, 0*areaSize+xAdd, 8*areaSize+yAdd),
            new Cube(31154, 0*areaSize+xAdd, 9*areaSize+yAdd),
            new Cube(31155, 0*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(31156, 0*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(31157, 0*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(31158, 0*areaSize+xAdd, 13*areaSize+yAdd),
            new Cube(31159, 0*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(31160, 5*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31161, 6*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31162, 7*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31163, 8*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31164, 9*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31165, 10*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31166, 11*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31167, 7*areaSize+xAdd, 1*areaSize+yAdd),
            new Cube(31168, 7*areaSize+xAdd, 2*areaSize+yAdd),
            new Cube(31169, 7*areaSize+xAdd, 3*areaSize+yAdd),
            new Cube(31170, 7*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(31171, 7*areaSize+xAdd, 5*areaSize+yAdd),
            new Cube(31172, 1*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(31173, 2*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(31174, 3*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(31175, 4*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(31176, 11*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(31177, 12*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(31178, 13*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(31179, 13*areaSize+xAdd, 5*areaSize+yAdd),
            new Cube(31180, 14*areaSize+xAdd, 5*areaSize+yAdd),
            new Cube(31181, 2*areaSize+xAdd, 7*areaSize+yAdd),
            new Cube(31182, 3*areaSize+xAdd, 7*areaSize+yAdd),
            new Cube(31183, 4*areaSize+xAdd, 7*areaSize+yAdd),
            new Cube(31184, 14*areaSize+xAdd, 7*areaSize+yAdd),
            new Cube(31185, 4*areaSize+xAdd, 8*areaSize+yAdd),
            new Cube(31186, 12*areaSize+xAdd, 8*areaSize+yAdd),
            new Cube(31187, 13*areaSize+xAdd, 8*areaSize+yAdd),
            new Cube(31188, 14*areaSize+xAdd, 8*areaSize+yAdd),
            new Cube(31189, 4*areaSize+xAdd, 9*areaSize+yAdd),
            new Cube(31190, 12*areaSize+xAdd, 9*areaSize+yAdd),
            new Cube(31191, 2*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(31192, 4*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(31193, 1*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(31194, 2*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(31195, 4*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(31196, 5*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(31197, 6*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(31198, 8*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(31199, 9*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(31200, 4*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(31201, 6*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(31202, 7*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(31203, 8*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(31204, 4*areaSize+xAdd, 13*areaSize+yAdd),
            new Cube(31205, 4*areaSize+xAdd, 14*areaSize+yAdd)
        ];
    }else if(x == -1 && y == -1){
        var xAdd = x*15*areaSize;
        var yAdd = y*15*areaSize;
        return [
            new Cube(41101, 0*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41102, 0*areaSize+xAdd, 1*areaSize+yAdd),
            new Cube(41103, 0*areaSize+xAdd, 2*areaSize+yAdd),
            new Cube(41104, 0*areaSize+xAdd, 3*areaSize+yAdd),
            new Cube(41105, 0*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(41106, 0*areaSize+xAdd, 5*areaSize+yAdd),
            new Cube(41107, 0*areaSize+xAdd, 6*areaSize+yAdd),
            new Cube(41108, 0*areaSize+xAdd, 7*areaSize+yAdd),
            new Cube(41109, 0*areaSize+xAdd, 8*areaSize+yAdd),
            new Cube(41110, 0*areaSize+xAdd, 9*areaSize+yAdd),
            new Cube(41111, 0*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(41112, 0*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(41113, 0*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(41114, 0*areaSize+xAdd, 13*areaSize+yAdd),
            new Cube(41115, 0*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(41116, 1*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41117, 2*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41118, 3*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41119, 4*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41120, 5*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41121, 6*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41122, 7*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41123, 8*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41124, 9*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41125, 10*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41126, 11*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41127, 12*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41128, 13*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(41129, 14*areaSize+xAdd, 0*areaSize+yAdd)
        ];
    }else if(x == 0 && y == -1){
        var xAdd = x*15*areaSize;
        var yAdd = y*15*areaSize;
        return [
            new Cube(30101, 0*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30102, 1*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30103, 2*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30104, 3*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30105, 4*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30106, 5*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30107, 6*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30108, 7*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30109, 8*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30110, 9*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30111, 10*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30112, 11*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30113, 12*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30114, 13*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30115, 14*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(30116, 3*areaSize+xAdd, 3*areaSize+yAdd)
        ];
    }else if(x == 1 && y == -1){
        var xAdd = x*15*areaSize;
        var yAdd = y*15*areaSize;
        return [
            new Cube(31115, 0*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31116, 1*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31117, 2*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31118, 3*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31119, 4*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31120, 5*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31121, 6*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31122, 7*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31123, 8*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31124, 9*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31125, 10*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31126, 11*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31127, 12*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31128, 13*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31129, 14*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31130, 14*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(31131, 14*areaSize+xAdd, 1*areaSize+yAdd),
            new Cube(31132, 14*areaSize+xAdd, 2*areaSize+yAdd),
            new Cube(31133, 14*areaSize+xAdd, 3*areaSize+yAdd),
            new Cube(31134, 14*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(31135, 14*areaSize+xAdd, 5*areaSize+yAdd),
            new Cube(31136, 14*areaSize+xAdd, 6*areaSize+yAdd),
            new Cube(31137, 14*areaSize+xAdd, 7*areaSize+yAdd),
            new Cube(31138, 14*areaSize+xAdd, 8*areaSize+yAdd),
            new Cube(31139, 14*areaSize+xAdd, 9*areaSize+yAdd),
            new Cube(31140, 14*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(31141, 14*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(31142, 14*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(31143, 14*areaSize+xAdd, 13*areaSize+yAdd),
            new Cube(31144, 14*areaSize+xAdd, 14*areaSize+yAdd)
        ];
    }else if(x == 1 && y == 0){
        var xAdd = x*15*areaSize;
        var yAdd = y*15*areaSize;
        return [
            new Cube(20111, 14*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(20112, 14*areaSize+xAdd, 1*areaSize+yAdd),
            new Cube(20113, 14*areaSize+xAdd, 2*areaSize+yAdd),
            new Cube(20114, 14*areaSize+xAdd, 3*areaSize+yAdd),
            new Cube(20115, 14*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(20116, 14*areaSize+xAdd, 5*areaSize+yAdd),
            new Cube(20117, 14*areaSize+xAdd, 6*areaSize+yAdd),
            new Cube(20118, 14*areaSize+xAdd, 7*areaSize+yAdd),
            new Cube(20119, 14*areaSize+xAdd, 8*areaSize+yAdd),
            new Cube(20120, 14*areaSize+xAdd, 9*areaSize+yAdd),
            new Cube(20121, 14*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(20122, 14*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(20123, 14*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(20124, 14*areaSize+xAdd, 13*areaSize+yAdd),
            new Cube(20125, 14*areaSize+xAdd, 14*areaSize+yAdd)
        ];
    }else if(x == 1 && y == 1){
        var xAdd = x*15*areaSize;
        var yAdd = y*15*areaSize;
        return [
            new Cube(21115, 0*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21116, 1*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21117, 2*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21118, 3*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21119, 4*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21120, 5*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21121, 6*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21122, 7*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21123, 8*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21124, 9*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21125, 10*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21126, 11*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21127, 12*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21128, 13*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21129, 14*areaSize+xAdd, 14*areaSize+yAdd),
            new Cube(21130, 14*areaSize+xAdd, 0*areaSize+yAdd),
            new Cube(21131, 14*areaSize+xAdd, 1*areaSize+yAdd),
            new Cube(21132, 14*areaSize+xAdd, 2*areaSize+yAdd),
            new Cube(21133, 14*areaSize+xAdd, 3*areaSize+yAdd),
            new Cube(21134, 14*areaSize+xAdd, 4*areaSize+yAdd),
            new Cube(21135, 14*areaSize+xAdd, 5*areaSize+yAdd),
            new Cube(21136, 14*areaSize+xAdd, 6*areaSize+yAdd),
            new Cube(21137, 14*areaSize+xAdd, 7*areaSize+yAdd),
            new Cube(21138, 14*areaSize+xAdd, 8*areaSize+yAdd),
            new Cube(21139, 14*areaSize+xAdd, 9*areaSize+yAdd),
            new Cube(21140, 14*areaSize+xAdd, 10*areaSize+yAdd),
            new Cube(21141, 14*areaSize+xAdd, 11*areaSize+yAdd),
            new Cube(21142, 14*areaSize+xAdd, 12*areaSize+yAdd),
            new Cube(21143, 14*areaSize+xAdd, 13*areaSize+yAdd)
        ];
    }else{
        return [];
    }
}
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function playerNewRandomColor() {
    if(ply1){
        ply1.color = getRandomColor();
    }else{
        console.log("playerNewRandomColor doesn't work, no player");
    }
}

