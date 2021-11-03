import PropTypes from 'prop-types';


import './Nav.css';

export default function Nav (props) {

  const { name, id } = props.user;
  const userForDisplay = name || id;

  return (
    <div className="nav">
      <div className="nav__logo">Oriflamme</div>
      <div className="nav__user">
        <div>{userForDisplay}</div>
      </div>
    </div>
  );
}

//----------------------------------------------------------------
// PROPS
//----------------------------------------------------------------

const { string, shape } = PropTypes;

Nav.propTypes = {
  user: shape({
    id: string,
    name: string
  }),
};