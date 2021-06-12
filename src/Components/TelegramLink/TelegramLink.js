import React from "react";

function TelegramLink(props) {
  return (
    <div>
      <div className="alert alert-info d-block" role="alert">
        <b>
          <small>
            <a
              href={"https://telegram.me/" + props.tid}
              target="_blank"
              className="twitter text-primary"
              style={{ fontWeight: "bold" }}
            >
              <i className="bx bxl-telegram"></i> Join {props.name} Telegram
              channel for live updates
            </a>
          </small>
        </b>
      </div>
    </div>
  );
}

export default TelegramLink;
