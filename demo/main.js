document.addEventListener('DOMContentLoaded', () => {
  $l('.addToDo').on('click', () => {
    const input = $l('.userInput').htmlElements[0].value;
    const button = $l('button');

    $l('.list').append(`<li>${input}<button class='completedToDo'>Completed</button></li>`);
    $l('.userInput').htmlElements[0].value = '';

    $l('.completedToDo').on('click', () =>
      $l('.completedToDo').parent().remove()
    );
  });
});
