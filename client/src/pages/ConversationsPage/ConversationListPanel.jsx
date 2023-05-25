import ConversationList from "../../components/Conversations/ConversationList";

const ConversationListPanel = () => {
  return (
    <div className="flex bg-base-100 w-full lg:w-1/3 lg:max-w-md flex-col h-full p-2">
      <h2 className="text-3xl font-semibold mx-2 mt-2">Conversations</h2>
      <div className="flex justify-center w-full mt-6 mb-4 mx-2">
        <button>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <div className="form-control w-full">
          <div className="input-group input-group-sm w-full justify-center">
            <input
              type="text"
              placeholder="Search…"
              className="input input-sm focus:outline-none bg-base-200 w-5/6 focus:bg-base-100 focus:border-2 border-base-200 transition-all duration-300"
            />
            <button className="btn btn-sm btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ConversationList />
    </div>
  );
};

export default ConversationListPanel;