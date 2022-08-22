export const apiServerUrl = (resource) =>
  resource ? `http://localhost:8000/${resource}` : "";

export const getRemainingTime = (time) => {
  var now = new Date().getTime();
  var timeleft = new Date(time) - now;

  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  return `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
};

export const proposalStatus = {
  ACCEPTED: {
    color: "success",
    text: "Accepted",
  },
  PENDING: {
    color: "primary",
    text: "Pending",
  },
  DECLINED: {
    color: "error",
    text: "Declined",
  },
};

export const requestStatus = {
  OPEN: {
    color: "success",
    text: "Open",
  },
  ACTIVE_ORDER: {
    color: "warning",
    text: "Active Order",
  },
  CLOSED: {
    color: "",
    text: "Closed",
  },
};

export const orderStatus = {
  IN_PROGRESS: {
    color: "primary",
    text: "In Progress",
  },
  DELIVERD: {
    color: "secondary",
    text: "Deliverd",
  },
  CANCELLED: {
    color: "error",
    text: "Cancelled",
  },
  COMPLETED: {
    color: "success",
    text: "Completed",
  },
};
