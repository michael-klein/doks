import{j as jsx}from"./main.js";import{C as Card}from"./Card.js";const ConditionalCard=({children:a,showCard:o,elevation:r=1,sx:i={}})=>o?jsx(Card,{elevation:r,sx:i,children:a}):a;export{ConditionalCard as C};