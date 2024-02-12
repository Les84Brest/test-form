const BASE_URL = 'http://localhost:9090';

class SendFeedback {
  async sendFormData(formData) {

    const urlEncoded = new URLSearchParams(formData).toString();

    const response = await fetch(`${BASE_URL}/feedback`, {
      method: 'POST',
      body: urlEncoded,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    });
    if (response.ok) {
      let result = await response.json();
      return result;
    } else {
      let errorRes = await response.json();
      return errorRes;
    }
  }
}

export default SendFeedback