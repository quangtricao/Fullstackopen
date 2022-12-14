/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Quang Tri Cao',
      username: 'newuser',
      password: 'newuser',
    }
    const user2 = {
      name: 'user 2',
      username: 'newuser2',
      password: 'newuser2',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('newuser')
      cy.get('#password').type('newuser')
      cy.get('#login-button').click()

      cy.contains('newuser logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('newuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      // cy.get('.error').contains('wrong username or password')
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('newuser')
      cy.get('#password').type('newuser')
      cy.get('#login-button').click()

      cy.contains('new note').click()
      cy.get('#title-input').type('blog 1')
      cy.get('#author-input').type('Quang Tri Cao')
      cy.get('#url-input').type('abc.com')
      cy.get('#create-new-blog').click()
    })

    it('A blog can be created', function() {
      cy.contains('a new blog blog 1 by Quang Tri Cao added')
    })
    it('An user can like a blog', function() {
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('Updated likes of Quang Tri Cao')
    })
    it.only('the user who created a blog can delete it', function() {
      cy.get('#view-button').click()
      // cy.contains('#remove-button')
    })
    it('other users cannot delete the blog', function() {
      cy.get('#log-out-button').click()
      cy.get('#username').type('newuser2')
      cy.get('#password').type('newuser2')
      cy.get('#login-button').click()
      cy.get('#view-button').click()
    })
  })

})
