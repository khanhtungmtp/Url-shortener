namespace API.Helpers
{
    public class OperationResult
    {
        public string Message { set; get; } = string.Empty;
        public bool IsSuccess { set; get; }
        public object Data { set; get; } = default!;

        public OperationResult()
        {

        }

        public OperationResult(string message)
        {
            this.Message = message;
        }

        public OperationResult(bool isSuccess)
        {
            this.IsSuccess = isSuccess;
        }

        public OperationResult(bool isSuccess, string message)
        {
            this.Message = message;
            this.IsSuccess = isSuccess;
        }

        public OperationResult(bool isSuccess, object data)
        {
            this.IsSuccess = isSuccess;
            this.Data = data;
        }

        public OperationResult(bool isSuccess, string message, object data)
        {
            this.Message = message;
            this.IsSuccess = isSuccess;
            this.Data = data;
        }
    }
}