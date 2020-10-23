// Tic-Tac-Toe functionality

let gameBoard = (() => {
    let _state = [[null,null,null],
                  [null,null,null],
                  [null,null,null]]
    
    let _currentPlayer = 'X'
    
    let _table = document.getElementsByTagName('table')[0]
    
    const makePlay = (player, move) => {
        if(_isValidMove(move)) {
            _addPlay(player, move)
            _togglePlayer()
            renderBoard()
            return true
        }
        alert('Bad move, try again.')
        return false
    }
    
    const _isValidMove = (move) => {
        let [x,y] = move
        if(_state[x][y] != null) {
            return false
        }
        return true
    }

    const _addPlay = (player, move) => {
        let [x,y] = move
        _state[x][y] = player
    }

    const _togglePlayer = () => {
        if(_currentPlayer == 'X') {
            _currentPlayer = 'O'
        } else {
            _currentPlayer = 'X'
        }
    }

    const resetBoard = () => {
        _state = [[null,null,null],
                  [null,null,null],
                  [null,null,null]]
        renderBoard()
    }

    const renderBoard = () => {
        while(_table.firstChild) {
            _table.removeChild(_table.lastChild)
        }
        for(i = 0; i < 3; i++) {
            let row = document.createElement('tr')
            for(j = 0; j < 3; j++){
                let column = document.createElement('td')
                let move = [i,j]
                column.addEventListener("click", () =>  {makePlay(_currentPlayer, move)})
                if(_state[i][j] != null){
                    column.innerHTML = _state[i][j]
                }
                row.appendChild(column)
            }
            _table.appendChild(row)
        }
    }

    renderBoard()

    return {
        makePlay,
        resetBoard,
    }
})()