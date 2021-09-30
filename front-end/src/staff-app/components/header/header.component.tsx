import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { Colors } from "shared/styles/colors"
import { FontWeight } from "shared/styles/styles"

export const Header: React.FC = () => {
  return (
    <S.Header>
      <S.HeaderItems>
        <S.HeaderItem to="/">Boardingware</S.HeaderItem>
        <NavItem to="daily-care">Daily Care</NavItem>
        <NavItem to="activity">Activity</NavItem>
      </S.HeaderItems>
    </S.Header>
  )
}

interface Props {
  to: string
}

// Navigation Link items.
const NavItem: React.FC<Props> = ({to, children}) => {
  return (
    <S.HeaderItem to={to} activeStyle={{ backgroundColor: "#1b4f90" }}>
      {children}
    </S.HeaderItem>
  )
}

const S = {
  Header: styled.header`
    display: flex;
    align-items: center;
    height: 56px;
    background-color: ${Colors.blue.base};
    color: #fff;
  `,
  HeaderItems: styled.nav`
    display: flex;
    height: 100%;
  `,
  HeaderItem: styled(NavLink)`
    text-decoration: none;
    font-weight: ${FontWeight.strong};
    color: #fff;
    padding: 18px 20px 17px;
  `,
}
