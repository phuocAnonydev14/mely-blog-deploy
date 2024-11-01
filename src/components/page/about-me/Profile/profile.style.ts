import styled from 'styled-components';

export const ProfileStyle = styled('div')`
  border-radius: 20px;
  border: 1px solid white;
  min-height: 80vh;
  padding: 10px;

  .card-profile {
    position: relative;
    border: none;
    height: 100%;

    .item-card {
      margin: 10px 0;
    }

    .bg-image {
      height: 100px;
      width: 100%;
      object-fit: cover;
    }

    .avatar {
      position: absolute;
      left: 20px;
      top: 12%;
    }

    .fullname {
      margin: 10px 0;
    }

    .btn-edit-profile {
      width: calc(100% - 48px);
      margin: 0 24px;
    }
  }
`;
