const app = document.getElementById('root');
var container = document.createElement('div');
// //placing the container in the HTML file
// app.parentNode.removeChild(app);
app.appendChild(container);
var api_path = 'https://api.parsely.com/v2/analytics/posts?';
var apikey = 'apikey=texasmonthly.com&secret=J44znyy0vsL7tsYzacxIjtVZhQA4uT8kQqN2ZK72Sko';
var post_limit = '&endpoint=/analytics/posts&page=1&limit=5&sort=views&period_start=';
var character = 'h';
var hoursField = document.getElementById('hours');

//Dispalying the content of the default value
//The value will continue to change as the eventListener is triggered!
var defaultContent = 24;
console.log( defaultContent );
hoursRequest (defaultContent);

//event listener that will trigger the main function.
hoursField.addEventListener( 'change', function(e) {
  //clearing the div before appending
  container.innerHTML = "";
  //day to hours conversion:
  var dayToHours = 24 * this.value;
  hoursRequest( dayToHours );
  console.log( dayToHours );
})

function hoursRequest( hours ){
  var url = api_path + apikey + post_limit + hours + character;

  var request = new XMLHttpRequest(); //open a connection with the API
  //API Endpoint connection.
  request.open('GET', url, true)
  request.onload = function()
  {
    //JSON function to parse data from the API
    var info = JSON.parse(this.response)
    if(request.status >= 200 && request.status < 400)
    {
      //Create a temporary block to hold the
      var block = document.createElement('ol');
      //Extracting data for link and title
      info.data.forEach(post => {
        //create a card to hold the value.
        var card = document.createElement('li');
        // card.setAttribute('class', 'card');
        //hyperlink and title:
        var a = document.createElement('a');
        var title = document.createTextNode(post.title)
        a.appendChild(title);
        a.href = post.link;
        a.title = post.title;
        //other non-necessary CSS element will be moved to
        //in-line styling in the HTML file.
        a.style.cssText = 'text-decoration: none; color: #f75a38; padding: 2px 0; font-family: Helvetica, Arial, sans-serif; font-size: 16px; line-height: 20px; font-weight: bold;';
        document.body.appendChild(a);
        //text content to the post's title and link
        // card.innerHTML = "<a href='"+post.link+" '>"+post.title+"</a>";
        card.appendChild(a);
        //Adding inline css style:
        // card.style.cssText = "padding: 2px 0; font-family: Helvetica, Arial, sans-serif; font-size: 16px; line-height: 20px; font-weight: bold;";

        // Add the card to block
        block.appendChild(card);
      })
      console.log(block);

      //Inserting CSS line into the class
      var ordList = document.getElementById("list");
      ordList.innerHTML = "";
      ordList.appendChild(block);

      //adding an ordered list into a div
      var code = document.getElementById("source"); //source will containst the html contents to be used for hubstubb
      //Clearing the block before appending.
      code.innerHTML = "";
      code.append(ordList.innerHTML);

    } else {
      //Error handling
      const errorMessage = document.createElement('error')
      errorMessage.textContent = "Connection Error!"
      app.appendChild(errorMessage)

    }
  }  //Send request (get sent out)
  request.send()
}
